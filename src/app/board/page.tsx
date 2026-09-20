import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ActionBadge, QualityBadge } from "@/components/Badge";
import { SLATE } from "@/lib/data";
import { formatAmerican, formatEdge, formatKickoff, formatPct } from "@/lib/format";

export default function BoardPage() {
  const plays = SLATE.filter((m) => m.action === "PLAY").length;
  const passes = SLATE.length - plays;

  return (
    <div>
      <Nav active="board" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl text-[#f3f6f8]">Board</h1>
            <p className="mt-1 text-[13px] text-[#8b93a1]">
              Model versus market. Default threshold 3.0 pp. Quiet slates stay quiet.
            </p>
          </div>
          <div className="flex gap-6 font-mono text-[12px] text-[#8b93a1]">
            <span>
              <span className="text-[#c8f542]">{plays}</span> play
            </span>
            <span>
              <span className="text-[#e8edf2]">{passes}</span> pass
            </span>
            <span>updated 10:18 UTC</span>
          </div>
        </div>
        <div className="overflow-x-auto border border-[#1c2129]">
          <table className="w-full min-w-[880px] text-left text-[13px]">
            <thead className="bg-[#0d0f13] font-mono text-[10px] uppercase tracking-[0.14em] text-[#5b6470]">
              <tr>
                <th className="px-3 py-2 font-normal">Event</th>
                <th className="px-3 py-2 font-normal">Market</th>
                <th className="px-3 py-2 font-normal">Model</th>
                <th className="px-3 py-2 font-normal">Market</th>
                <th className="px-3 py-2 font-normal">Edge</th>
                <th className="px-3 py-2 font-normal">Best number</th>
                <th className="px-3 py-2 font-normal">Quality</th>
                <th className="px-3 py-2 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2129]">
              {SLATE.map((m) => (
                <tr key={m.id} className="hover:bg-[#10131a]">
                  <td className="px-3 py-3">
                    <Link href={`/brief/${m.id}`} className="text-[#e8edf2]">
                      {m.home} vs {m.away}
                    </Link>
                    <div className="mt-0.5 text-[11px] text-[#6b7380]">
                      {m.league} · {formatKickoff(m.kickoff)}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#c5ccd4]">
                    {m.selection}
                    <div className="text-[11px] text-[#6b7380]">{m.market}</div>
                  </td>
                  <td className="px-3 py-3 font-mono">{formatPct(m.modelProb)}</td>
                  <td className="px-3 py-3 font-mono text-[#9aa3ad]">{formatPct(m.marketProb)}</td>
                  <td className={`px-3 py-3 font-mono ${m.edge >= 0.03 ? "text-[#c8f542]" : m.edge < 0 ? "text-[#ff6b6b]" : "text-[#8b93a1]"}`}>
                    {formatEdge(m.edge)}
                  </td>
                  <td className="px-3 py-3 font-mono">
                    {formatAmerican(m.bestAmerican)}
                    <div className="text-[11px] text-[#6b7380]">{m.bestBook}</div>
                  </td>
                  <td className="px-3 py-3"><QualityBadge q={m.dataQuality} /></td>
                  <td className="px-3 py-3"><ActionBadge action={m.action} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12px] text-[#5b6470]">
          PASS is a first-class output. If the desk always has twelve plays, it is a content farm.
        </p>
      </main>
    </div>
  );
}
