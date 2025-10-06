"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import inventoryService from "../../../lib/inventory";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function EquipmentDetailPage(){
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", kind: "success" });
  const [actionError, setActionError] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [checkoutQty, setCheckoutQty] = useState(1);
  const [checkoutDue, setCheckoutDue] = useState("");
  // Urgent checkout removed per requirements

  const role = user?.role || null;
  const canManage = isAuthenticated && ["mentor","researcher","admin"].includes(role);

  const refresh = async () => {
    try{
      setLoading(true);
      const data = await inventoryService.getEquipment(params.id);
      setItem(data);
    }catch(e){
      setError(e.message||"Failed to load equipment");
    }finally{ setLoading(false); }
  };

  useEffect(()=>{
    let isMounted = true;
    (async()=>{
      try{
        setLoading(true);
        const data = await inventoryService.getEquipment(params.id);
        if(!isMounted) return;
        setItem(data);
      }catch(e){
        if(!isMounted) return;
        setError(e.message||"Failed to load equipment");
      }finally{ if(isMounted) setLoading(false); }
    })();
    return ()=>{ isMounted=false; };
  },[params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center text-white/70">Not found</div>;

  const status = item.status;
  const statusClass = status === 'available' ? 'bg-green-600' : status === 'low_stock' ? 'bg-yellow-600' : status === 'out_of_stock' ? 'bg-red-600' : 'bg-white/20';

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <div className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>{status.replace(/_/g,' ')}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-white/80">Current Qty: <span className="text-white">{item.currentQuantity}</span></div>
            <div className="text-white/80">Min Qty: <span className="text-white">{item.minQuantity || 0}</span></div>
            <div className="text-white/80">Available: <span className="text-white">{item.currentQuantity > 0 ? 'Yes' : 'No'}</span></div>
            {item.location && <div className="text-white/80">Location: <span className="text-white">{item.location}</span></div>}
          </div>
          <div>
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt={item.name} className="w-full rounded-lg border border-white/10 object-contain max-h-72 bg-white/5" />
            )}
          </div>
        </div>

        {canManage ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button disabled={item.currentQuantity===0} onClick={()=>{ setActionError(""); setCheckoutQty(1); setCheckoutDue(""); setIsCheckoutOpen(true); }} className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-center disabled:opacity-50">Checkout</button>
            <button onClick={()=>{ setActionError(""); setIsReturnOpen(true); }} className="px-4 py-3 rounded-lg bg-green-600/80 hover:bg-green-600 text-white text-center">Return</button>
          </div>
        ) : (
          <div className="mt-6 text-white/70">You don’t have permission to manage this equipment.</div>
        )}

        {/* Checkout history */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Checkout History</h2>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="px-3 py-2 text-left">User</th>
                  <th className="px-3 py-2 text-left">Urgent</th>
                  <th className="px-3 py-2 text-left">Requested</th>
                  <th className="px-3 py-2 text-left">Fulfilled</th>
                  <th className="px-3 py-2 text-left">Overdrawn</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Checkout Date</th>
                  <th className="px-3 py-2 text-left">Expected Return</th>
                  <th className="px-3 py-2 text-left">Actual Return</th>
                </tr>
              </thead>
              <tbody>
                {(item.checkouts||[]).slice().reverse().map((c,idx)=>{
                  const urgent = !!c.isUrgent;
                  const requested = c.requestedQuantity ?? c.quantity ?? 0;
                  const fulfilled = c.fulfilledQuantity ?? requested;
                  const overdrawn = c.overdrawnQuantity ?? Math.max(0, requested - fulfilled);
                  const userName = c.userNameSnapshot || c.userId || '—';
                  return (
                    <tr key={idx} className="border-t border-white/10">
                      <td className="px-3 py-2">{userName}</td>
                      <td className="px-3 py-2">{urgent ? 'Yes' : 'No'}</td>
                      <td className="px-3 py-2">{requested}</td>
                      <td className="px-3 py-2">{fulfilled}</td>
                      <td className="px-3 py-2">{overdrawn}</td>
                      <td className="px-3 py-2 capitalize">{(c.status||'').replace(/_/g,' ')}</td>
                      <td className="px-3 py-2">{c.checkoutDate ? new Date(c.checkoutDate).toLocaleDateString() : '—'}</td>
                      <td className="px-3 py-2">{c.expectedReturnDate ? new Date(c.expectedReturnDate).toLocaleDateString() : '—'}</td>
                      <td className="px-3 py-2">{c.actualReturnDate ? new Date(c.actualReturnDate).toLocaleDateString() : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg border ${toast.kind === 'success' ? 'bg-green-600/90 border-green-500 text-white' : 'bg-red-600/90 border-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={()=>setIsCheckoutOpen(false)}>
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-xl p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4 text-white">Checkout - {item.name}</h3>
            {actionError && <div className="mb-3 text-sm text-red-400">{actionError}</div>}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block mb-1 text-sm text-white/80">Quantity</label>
                <input type="number" min={1} value={checkoutQty} onChange={(e)=>setCheckoutQty(Math.max(1, Number(e.target.value||1)))} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white" />
              </div>
              <div>
                <label className="block mb-1 text-sm text-white/80">Expected Return</label>
                <input type="date" value={checkoutDue} onChange={(e)=>setCheckoutDue(e.target.value)} className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10" onClick={()=>setIsCheckoutOpen(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white" onClick={async()=>{
                try{
                  setActionError("");
                  if(!checkoutQty || checkoutQty < 1){ setActionError('Quantity must be at least 1'); return; }
                  await inventoryService.checkoutEquipment(item._id, { quantity: checkoutQty, expectedReturnDate: checkoutDue || undefined });
                  setIsCheckoutOpen(false);
                  setToast({ visible:true, message:'Checked out successfully', kind:'success' });
                  setTimeout(()=>setToast({ visible:false, message:'', kind:'success' }), 2000);
                  await refresh();
                }catch(err){ setActionError(err.message||'Checkout failed'); }
              }}>Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Urgent flow removed */}

      {/* Return Modal */}
      {isReturnOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={()=>setIsReturnOpen(false)}>
          <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl p-6" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4 text-white">Return - {item.name}</h3>
            {actionError && <div className="mb-3 text-sm text-red-400">{actionError}</div>}
            <div className="text-white/80 mb-4">Submit to return your last active checkout for this item.</div>
            <div className="flex items-center justify-end gap-3">
              <button className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10" onClick={()=>setIsReturnOpen(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white" onClick={async()=>{
                try{
                  setActionError("");
                  await inventoryService.returnEquipment(item._id, {});
                  setIsReturnOpen(false);
                  setToast({ visible:true, message:'Returned successfully', kind:'success' });
                  setTimeout(()=>setToast({ visible:false, message:'', kind:'success' }), 2000);
                  await refresh();
                }catch(err){ setActionError(err.message||'Return failed'); }
              }}>Return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


