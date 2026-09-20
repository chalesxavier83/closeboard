import { Nav } from "@/components/Nav";
import { ResultBadge } from "@/components/Badge";
import { LEDGER, ledgerStats } from "@/lib/data";
import { clvLabel, formatAmerican, formatDate, formatPct } from "@/lib/format";

export default function LedgerPage() {
  const stats = ledgerStats(LEDGER);
  return (
    <div>
      <Nav active="ledger" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-2xl text-[#f3f6f8]">Public ledger</h1>
        <p className="mt-1 max-w-2xl text-[13px] leading-6 text-[#8b93a1]">Every published lean stays here. No deletions after kickoff.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[ ["Settled", `${stats.sample}`], ["Beat close", formatPct(stats.beatClose, 0)], ["Avg CLV", `${stats.avgClv > 0 ? "+" : ""}${Math.round(stats.avgClv)}¢`], ["Units", `${stats.units >= 0 ? "+" : ""}${stats.units.toFixed(2)}`], ["Hit rate", formatPct(stats.winRate, 0)] ].map(([k, v]) => (
            <div key={k} className="border border-[#1c2129] bg-[#0d0f13] px-3 py-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6470]">{k}</div>
              <div className="mt-1 font-mono text-xl">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 overflow-x-auto border border-[#1c2129]">
          <table className="w-full min-w-[980px] text-left text-[13px]">
            <thead className="bg-[#0d0f13] font-mono text-[10px] uppercase tracking-[0.14em] text-[#5b6470]">
              <tr>{["Published", "Event", "Selection", "Pub", "Close", "CLV", "Result", "Units"].map((h) => <th key={h} className="px-3 py-2 font-normal">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-[#1c2129]">
              {LEDGER.map((r) => (
                <tr key={r.id} className="hover:bg-[#10131a]">
                  <td className="px-3 py-3 font-mono text-[12px] text-[#8b93a1]">{formatDate(r.publishedAt)}</td>
                  <td className="px-3 py-3">{r.event}<div className="text-[11px] text-[#6b7380]">{r.league} · {r.market}</div></td>
                  <td className="px-3 py-3 text-[#c5ccd4]">{r.selection}</td>
                  <td className="px-3 py-3 font-mono">{formatAmerican(r.publishedAmerican)}</td>
                  <td className="px-3 py-3 font-mono text-[#9aa3ad]">{formatAmerican(r.closeAmerican)}</td>
                  <td className={`px-3 py-3 font-mono ${r.clvCents > 0 ? "text-[#c8f542]" : r.clvCents < 0 ? "text-[#ff6b6b]" : "text-[#8b93a1]"}`}>{clvLabel(r.clvCents)}</td>
                  <td className="px-3 py-3"><ResultBadge result={r.result} /></td>
                  <td className={`px-3 py-3 font-mono ${r.units > 0 ? "text-[#c8f542]" : r.units < 0 ? "text-[#ff6b6b]" : "text-[#8b93a1]"}`}>{r.units > 0 ? "+" : ""}{r.units.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
