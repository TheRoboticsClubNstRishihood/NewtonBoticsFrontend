"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, Calendar, Plus, Trash2, ThumbsUp, XCircle, Edit3, Filter } from "lucide-react";
import projectRequestsService from "@/lib/projectRequests";
import { useAuth } from "@/contexts/AuthContext";

const STATUSES = ["pending", "under_review", "approved", "rejected", "on_hold"];

const ProjectRequestsPage = () => {
  const { isAuthenticated, hasRole, user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [createData, setCreateData] = useState({
    title: "",
    description: "",
    teamSize: "",
    estimatedDurationMonths: "",
    objectives: [""],
    expectedOutcomes: [""],
    budgetEstimate: "",
    requiredResources: [""],
  });

  const [filters, setFilters] = useState({ status: "", mentorId: "", submittedBy: "", limit: 20, skip: 0 });
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, skip: 0, hasMore: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const canMentor = useMemo(() => hasRole("mentor") || hasRole("admin"), [hasRole]);
  const canAdmin = useMemo(() => hasRole("admin"), [hasRole]);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const { items, pagination: pg } = await projectRequestsService.list({
          status: filters.status || undefined,
          mentorId: filters.mentorId || undefined,
          submittedBy: filters.submittedBy || undefined,
          limit: filters.limit,
          skip: filters.skip,
        });
        if (!ignore) {
          setList(items || []);
          setPagination(pg || { total: 0, limit: filters.limit, skip: filters.skip, hasMore: false });
        }
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load project requests");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [filters.status, filters.mentorId, filters.submittedBy, filters.limit, filters.skip]);

  const onChangeCreate = (e) => {
    const { name, value } = e.target;
    setCreateData((p) => ({ ...p, [name]: value }));
  };

  const onArrayChange = (key, idx, value) => {
    setCreateData((p) => {
      const next = [...(p[key] || [])];
      next[idx] = value;
      return { ...p, [key]: next };
    });
  };
  const onArrayAdd = (key) => setCreateData((p) => ({ ...p, [key]: [...(p[key] || []), ""] }));
  const onArrayRemove = (key, idx) => setCreateData((p) => ({ ...p, [key]: (p[key] || []).filter((_, i) => i !== idx) }));

  const submitCreate = async (e) => {
    e.preventDefault();
    // Client-side validation
    const errs = {};
    const title = (createData.title || "").trim();
    const description = (createData.description || "").trim();
    const teamSize = parseInt(String(createData.teamSize), 10);
    const estimatedDurationMonths = parseInt(String(createData.estimatedDurationMonths), 10);
    const budgetEstimate = createData.budgetEstimate === "" ? undefined : Number(createData.budgetEstimate);
    const objectives = (createData.objectives || []).map((s) => (s || "").trim()).filter(Boolean);
    const expectedOutcomes = (createData.expectedOutcomes || []).map((s) => (s || "").trim()).filter(Boolean);
    const requiredResources = (createData.requiredResources || []).map((s) => (s || "").trim()).filter(Boolean);

    if (title.length < 5 || title.length > 255) errs.title = "Title must be 5-255 characters";
    if (description.length < 20 || description.length > 5000) errs.description = "Description must be 20-5000 characters";
    if (!Number.isInteger(teamSize) || teamSize < 1 || teamSize > 20) errs.teamSize = "Team size must be an integer 1-20";
    if (!Number.isInteger(estimatedDurationMonths) || estimatedDurationMonths < 1 || estimatedDurationMonths > 24) errs.estimatedDurationMonths = "Duration must be an integer 1-24";

    // Optional fields validation (max lengths)
    for (const obj of objectives) {
      if (obj.length > 500) { errs.objectives = "Each objective must be ≤ 500 characters"; break; }
    }
    for (const out of expectedOutcomes) {
      if (out.length > 500) { errs.expectedOutcomes = "Each expected outcome must be ≤ 500 characters"; break; }
    }
    for (const res of requiredResources) {
      if (res.length > 200) { errs.requiredResources = "Each resource description must be ≤ 200 characters"; break; }
    }
    if (budgetEstimate !== undefined && (isNaN(budgetEstimate) || budgetEstimate < 0)) {
      errs.budgetEstimate = "Budget must be a number ≥ 0";
    }

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      setLoading(true);
      setError("");
      const payload = {
        title,
        description,
        teamSize,
        estimatedDurationMonths,
      };
      if (budgetEstimate !== undefined) payload.budgetEstimate = budgetEstimate;
      if (objectives.length) payload.objectives = objectives;
      if (expectedOutcomes.length) payload.expectedOutcomes = expectedOutcomes;
      if (requiredResources.length) payload.requiredResources = requiredResources;
      const item = await projectRequestsService.create(payload);
      setShowForm(false);
      setCreateData({ title: "", description: "", teamSize: "", estimatedDurationMonths: "", objectives: [""], expectedOutcomes: [""], budgetEstimate: "", requiredResources: [""] });
      // Prepend the new item if current filters show it
      setList((prev) => [item, ...prev]);
      setPagination((pg) => ({ ...pg, total: (pg?.total || 0) + 1 }));
    } catch (e) {
      setError(e?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const [detail, setDetail] = useState(null);
  const openDetails = async (id) => {
    try {
      setError("");
      const item = await projectRequestsService.get(id);
      if (!item) throw new Error("Not found");
      setDetail(item);
    } catch (e) {
      setError(e?.message || "Failed to load details");
    }
  };
  const closeDetails = () => setDetail(null);

  const approve = async (id) => {
    try {
      setLoading(true);
      await projectRequestsService.approve(id);
      setList((prev) => prev.map((it) => (it._id === id ? { ...it, status: "approved" } : it)));
      if (detail?._id === id) setDetail({ ...detail, status: "approved" });
    } catch (e) {
      setError(e?.message || "Approve failed");
    } finally {
      setLoading(false);
    }
  };

  const reject = async (id) => {
    const reason = window.prompt("Reason (optional):") || undefined;
    try {
      setLoading(true);
      await projectRequestsService.reject(id, { reason });
      setList((prev) => prev.map((it) => (it._id === id ? { ...it, status: "rejected", reviewNotes: reason } : it)));
      if (detail?._id === id) setDetail({ ...detail, status: "rejected", reviewNotes: reason });
    } catch (e) {
      setError(e?.message || "Reject failed");
    } finally {
      setLoading(false);
    }
  };

  const quickUpdateStatus = async (id, nextStatus) => {
    try {
      setLoading(true);
      const updated = await projectRequestsService.update(id, { status: nextStatus });
      if (!updated) throw new Error("Not found");
      setList((prev) => prev.map((it) => (it._id === id ? updated : it)));
      if (detail?._id === id) setDetail(updated);
    } catch (e) {
      setError(e?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this request? This cannot be undone.")) return;
    try {
      setLoading(true);
      const ok = await projectRequestsService.remove(id);
      if (!ok) throw new Error("Not found");
      setList((prev) => prev.filter((it) => it._id !== id));
      setPagination((pg) => ({ ...pg, total: Math.max(0, (pg?.total || 1) - 1) }));
      if (detail?._id === id) setDetail(null);
    } catch (e) {
      setError(e?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const resetSkip = (next) => setFilters((f) => ({ ...f, skip: next }));

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Project Request System
        </h1>
        <p className="text-lg text-white/80">Submit ideas and track their lifecycle.</p>
      </motion.div>

      <motion.section
        className="max-w-7xl mx-auto mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row md:items-end gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/60" />
            <span className="text-white/80 text-sm">Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <div>
              <label className="block text-xs text-white/60 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value, skip: 0 }))}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white text-sm shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              >
                <option value="">All</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Mentor ID</label>
              <input
                type="text"
                value={filters.mentorId}
                onChange={(e) => setFilters((f) => ({ ...f, mentorId: e.target.value, skip: 0 }))}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white text-sm shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                placeholder="optional"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Submitted By (User ID)</label>
              <input
                type="text"
                value={filters.submittedBy}
                onChange={(e) => setFilters((f) => ({ ...f, submittedBy: e.target.value, skip: 0 }))}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white text-sm shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                placeholder="optional"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Limit</label>
              <select
                value={filters.limit}
                onChange={(e) => setFilters((f) => ({ ...f, limit: Number(e.target.value), skip: 0 }))}
                className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white text-sm shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              >
                {[10,20,30,50,100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="max-w-7xl mx-auto mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold flex items-center font-display">
            <CheckCircle className="mr-3 text-green-400" /> All Requests
          </h2>
          {isAuthenticated && (
            <button
              onClick={() => setShowForm((s) => !s)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:from-red-600 hover:to-red-500 transition-all"
            >
              <Plus className="w-5 h-5" /> {showForm ? "Close" : "New Request"}
            </button>
          )}
            </div>

        {error && (
          <div className="mb-4 text-sm text-red-400">{error}</div>
        )}

        {showForm && (
          <div className="mb-8 bg-white/5 border border-white/10 p-4 rounded-lg">
            <form onSubmit={submitCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Title</label>
                  <input
                    type="text"
                  name="title"
                  value={createData.title}
                  onChange={onChangeCreate}
                  minLength={5}
                  maxLength={255}
                  required
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
                {fieldErrors.title && <div className="text-xs text-red-400 mt-1">{fieldErrors.title}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Description</label>
                <textarea
                  name="description"
                  value={createData.description}
                  onChange={onChangeCreate}
                  rows={4}
                  minLength={20}
                  maxLength={5000}
                  required
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
                {fieldErrors.description && <div className="text-xs text-red-400 mt-1">{fieldErrors.description}</div>}
            </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  min={1}
                  max={20}
                  value={createData.teamSize}
                  onChange={onChangeCreate}
                  required
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
                {fieldErrors.teamSize && <div className="text-xs text-red-400 mt-1">{fieldErrors.teamSize}</div>}
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Estimated Duration (months)</label>
                <input
                  type="number"
                  name="estimatedDurationMonths"
                  min={1}
                  max={24}
                  value={createData.estimatedDurationMonths}
                  onChange={onChangeCreate}
                  required
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
                {fieldErrors.estimatedDurationMonths && <div className="text-xs text-red-400 mt-1">{fieldErrors.estimatedDurationMonths}</div>}
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Budget Estimate (optional)</label>
                <input
                  type="number"
                  name="budgetEstimate"
                  min={0}
                  value={createData.budgetEstimate}
                  onChange={onChangeCreate}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                />
                {fieldErrors.budgetEstimate && <div className="text-xs text-red-400 mt-1">{fieldErrors.budgetEstimate}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Objectives (optional)</label>
                {createData.objectives.map((val, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => onArrayChange('objectives', idx, e.target.value)}
                      className="flex-1 rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                      placeholder="Objective"
                    />
                    <button type="button" onClick={() => onArrayRemove('objectives', idx)} className="px-2 rounded bg-white/5 text-white/80">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => onArrayAdd('objectives')} className="text-sm text-red-400">+ Add Objective</button>
                {fieldErrors.objectives && <div className="text-xs text-red-400 mt-1">{fieldErrors.objectives}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Expected Outcomes (optional)</label>
                {createData.expectedOutcomes.map((val, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => onArrayChange('expectedOutcomes', idx, e.target.value)}
                      className="flex-1 rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                      placeholder="Outcome"
                    />
                    <button type="button" onClick={() => onArrayRemove('expectedOutcomes', idx)} className="px-2 rounded bg-white/5 text-white/80">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => onArrayAdd('expectedOutcomes')} className="text-sm text-red-400">+ Add Expected Outcome</button>
                {fieldErrors.expectedOutcomes && <div className="text-xs text-red-400 mt-1">{fieldErrors.expectedOutcomes}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/80 mb-1">Required Resources (optional)</label>
                {createData.requiredResources.map((val, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => onArrayChange('requiredResources', idx, e.target.value)}
                      className="flex-1 rounded-md border border-white/10 bg-white/5 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                      placeholder="Resource description"
                    />
                    <button type="button" onClick={() => onArrayRemove('requiredResources', idx)} className="px-2 rounded bg-white/5 text-white/80">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => onArrayAdd('requiredResources')} className="text-sm text-red-400">+ Add Resource</button>
                {fieldErrors.requiredResources && <div className="text-xs text-red-400 mt-1">{fieldErrors.requiredResources}</div>}
            </div>
              <div className="md:col-span-2">
            <button
              type="submit"
                  disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-md hover:from-red-600 hover:to-red-500 transition-all"
            >
                  {loading ? "Submitting..." : "Submit Request"}
            </button>
              </div>
          </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full bg-white/5 backdrop-blur-lg rounded-lg border border-white/10">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted By</th>
                <th className="p-4">Submitted At</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((req) => (
                <tr key={req._id} className="border-b border-white/10">
                  <td className="p-4">{req.title}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      req.status === "approved" ? "bg-green-500/20 text-green-400" :
                      req.status === "rejected" ? "bg-red-500/20 text-red-400" :
                      req.status === "under_review" ? "bg-yellow-500/20 text-yellow-400" :
                      req.status === "on_hold" ? "bg-orange-500/20 text-orange-400" :
                      "bg-white/10 text-white"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/80">{req.submittedBy?.fullName || req.submittedBy?.email || String(req.submittedBy || '').slice(0,8)}</td>
                  <td className="p-4 text-white/60">{req.submittedAt ? new Date(req.submittedAt).toLocaleString() : '-'}</td>
                  <td className="p-4 flex gap-2 items-center">
                    <button onClick={() => openDetails(req._id)} className="text-red-400 hover:text-red-300 text-sm">View</button>
                    {canMentor && req.status !== "approved" && (
                      <button onClick={() => approve(req._id)} title="Approve" className="p-1.5 rounded bg-green-500/20 hover:bg-green-500/30 text-green-300">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                    )}
                    {canMentor && req.status !== "rejected" && (
                      <button onClick={() => reject(req._id)} title="Reject" className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300">
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    {canMentor && (
                      <div className="relative">
                        <select
                          title="Quick status"
                          value={req.status}
                          onChange={(e) => quickUpdateStatus(req._id, e.target.value)}
                          className="text-xs bg-white/5 border border-white/10 rounded px-1 py-1"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {canAdmin && (
                      <button onClick={() => remove(req._id)} title="Delete" className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    )}
                  </td>
                </tr>
              ))}
              {list.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-white/60">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-white/60 text-sm">Total: {pagination.total}</div>
          <div className="flex items-center gap-2">
            <button
              disabled={filters.skip <= 0 || loading}
              onClick={() => resetSkip(Math.max(0, filters.skip - pagination.limit))}
              className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/80 disabled:opacity-40"
            >Prev</button>
            <button
              disabled={!pagination.hasMore || loading}
              onClick={() => resetSkip(filters.skip + pagination.limit)}
              className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/80 disabled:opacity-40"
            >Next</button>
          </div>
        </div>
      </motion.section>

      {detail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-black rounded-xl p-8 w-full max-w-2xl border border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 font-display">{detail.title}</h2>
            <p className="text-white/80 mb-4">{detail.description}</p>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center"><Users className="w-4 h-4 mr-2" /> Team Size: {detail.teamSize}</div>
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Estimated Duration: {detail.estimatedDurationMonths} months</div>
              <div>Status: <span className="text-white">{detail.status}</span></div>
              <div>Submitted By: {detail.submittedBy?.fullName || detail.submittedBy?.email || String(detail.submittedBy || '').slice(0,8)}</div>
              <div>Submitted At: {detail.submittedAt ? new Date(detail.submittedAt).toLocaleString() : '-'}</div>
              {detail.reviewNotes && <div>Review Notes: {detail.reviewNotes}</div>}
              {detail.approvalDate && <div>Approval Date: {new Date(detail.approvalDate).toLocaleString()}</div>}
              </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={closeDetails}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-red-500 transition-all"
              >Close</button>
              <div className="flex gap-2">
                {canMentor && detail.status !== "approved" && (
                  <button onClick={() => approve(detail._id)} className="px-3 py-2 rounded bg-green-500/20 text-green-300 flex items-center gap-2"><ThumbsUp className="w-4 h-4"/>Approve</button>
                )}
                {canMentor && detail.status !== "rejected" && (
                  <button onClick={() => reject(detail._id)} className="px-3 py-2 rounded bg-red-500/20 text-red-300 flex items-center gap-2"><XCircle className="w-4 h-4"/>Reject</button>
                )}
                {canAdmin && (
                  <button onClick={() => remove(detail._id)} className="px-3 py-2 rounded bg-white/5 text-white/80 flex items-center gap-2"><Trash2 className="w-4 h-4"/>Delete</button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectRequestsPage;
