"use client";

import { useState, useEffect, useRef } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { Send, Users, Hash, Smile } from "lucide-react";

export default function ChatRoomPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, author: "System", content: "Welcome to the NewtonBotics chat room!", time: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      author: user?.firstName || user?.email || "You",
      content: input.trim(),
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070b12] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 grid place-items-center"><Hash className="w-4 h-4" /></div>
            <div>
              <h1 className="text-xl font-bold">Chat Room</h1>
              <p className="text-white/60 text-sm">Members only. Be respectful and collaborative.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-4">
            {/* Sidebar */}
            <div className="hidden lg:block bg-white/[0.06] border border-white/10 rounded-2xl p-4 h-[70vh]">
              <div className="flex items-center gap-2 mb-3 text-white/80"><Users className="w-4 h-4" /> Online Members</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> # General</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {user?.firstName || user?.email || "You"}</div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl h-[70vh] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                    <div className="text-xs text-white/50 mb-1">{m.author} • {m.time}</div>
                    <div className="text-white/90 whitespace-pre-wrap">{m.content}</div>
                  </motion.div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Composer */}
              <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex items-center gap-2">
                <button type="button" className="px-2 py-2 text-white/70 hover:text-white"><Smile className="w-5 h-5" /></button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-red-500/40 text-white placeholder-white/50"
                />
                <button type="submit" className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 font-semibold inline-flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}


