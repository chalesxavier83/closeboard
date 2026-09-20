"use client";

import { useMemo, useState } from "react";
import type { Market } from "@/lib/types";
import { formatAmerican, formatEdge, formatPct } from "@/lib/format";

const REFUSALS = ["give me a parlay", "locks", "lock", "sure bet", "guaranteed", "who do i bet", "what should i bet", "max bet"];

function answer(q: string, m: Market): string {
  const text = q.toLowerCase();
  if (REFUSALS.some((w) => text.includes(w))) {
    return "That is a tipster question. This desk will not build parlays or name a lock. Ask why the edge exists, what would kill it, or which book is actually offering the number.";
  }
  if (text.includes("why") || text.includes("reason")) {
    return `${m.reasons.join(" ")} Edge is ${formatEdge(m.edge)} versus a market implied ${formatPct(m.marketProb)}. Action is ${m.action}.`;
  }
  if (text.includes("risk") || text.includes("kill") || text.includes("against")) {
    return `The case against: ${m.risks.join(" ")} Data quality is ${m.dataQuality}.`;
  }
  if (text.includes("book") || text.includes("price") || text.includes("number") || text.includes("odds")) {
    const lines = m.books.map((b) => `${b.book} ${formatAmerican(b.american)}`).join(" · ");
    return `Best number is ${formatAmerican(m.bestAmerican)} at ${m.bestBook}. Rest of the board: ${lines}. If you cannot get within a few cents of the best number, the edge is gone.`;
  }
  if (text.includes("pass") || text.includes("play") || text.includes("threshold")) {
    return `Threshold is 3.0 pp after vig. This market is ${formatEdge(m.edge)}, so the desk says ${m.action}. Passing is not indecision. It is the product.`;
  }
  return `Market: ${m.selection}. Model ${formatPct(m.modelProb)} / market ${formatPct(m.marketProb)} / edge ${formatEdge(m.edge)}. Quality ${m.dataQuality}. Ask why, ask the risk, or ask for the number. Do not ask for a lock.`;
}

export function Analyst({ market }: { market: Market }) {
  const starters = useMemo(() => ["Why does the model disagree?", "What would kill this edge?", "Which book actually has the number?"], []);
  const [log, setLog] = useState<{ q: string; a: string }[]>([]);
  const [q, setQ] = useState("");
  function send(next: string) {
    const trimmed = next.trim();
    if (!trimmed) return;
    setLog((prev) => [...prev, { q: trimmed, a: answer(trimmed, market) }]);
    setQ("");
  }
  return (
    <div className="border border-[#1c2129] bg-[#0d0f13]">
      <div className="border-b border-[#1c2129] px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5b6470]">Analyst · rule-based MVP</p>
        <p className="mt-1 text-[13px] text-[#c5ccd4]">Interrogate the lean. It will refuse parlays and guaranteed-win talk.</p>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-3">
        {starters.map((s) => (
          <button key={s} type="button" onClick={() => send(s)} className="border border-[#2a313b] px-2 py-1 text-[12px] text-[#9aa3ad] hover:text-[#e8edf2]">{s}</button>
        ))}
      </div>
      <div className="min-h-[120px] space-y-3 px-4 pb-3">
        {log.map((row, i) => (
          <div key={i}>
            <p className="text-[12px] text-[#6b7380]">{row.q}</p>
            <p className="mt-1 text-[13px] leading-6 text-[#d5dbe2]">{row.a}</p>
          </div>
        ))}
      </div>
      <form className="flex border-t border-[#1c2129]" onSubmit={(e) => { e.preventDefault(); send(q); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about this market" className="w-full bg-transparent px-4 py-3 text-[13px] text-[#e8edf2] outline-none placeholder:text-[#4e5660]" />
        <button type="submit" className="px-4 text-[12px] uppercase tracking-[0.14em] text-[#c8f542]">Send</button>
      </form>
    </div>
  );
}
