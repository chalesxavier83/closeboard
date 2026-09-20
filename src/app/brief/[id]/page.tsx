import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ActionBadge, QualityBadge } from "@/components/Badge";
import { Analyst } from "@/components/Analyst";
import { getMarket } from "@/lib/data";
import { formatAmerican, formatEdge, formatKickoff, formatPct } from "@/lib/format";

export default async function BriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = getMarket(id);
  if (!m) notFound();
  return (
    <div>
      <Nav active="board" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link href="/board" className="text-[12px] text-[#8b93a1]">← Board</Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5b6470]">{m.league} · {formatKickoff(m.kickoff)}</p>
            <h1 className="mt-1 text-3xl tracking-tight text-[#f3f6f8]">{m.home} vs {m.away}</h1>
            <p className="mt-2 text-[15px] text-[#c5ccd4]">{m.selection}</p>
          </div>
          <div className="flex items-center gap-3">
            <QualityBadge q={m.dataQuality} />
            <ActionBadge action={m.action} />
          </div>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {[ ["Model", formatPct(m.modelProb)], ["Market", formatPct(m.marketProb)], ["Edge", formatEdge(m.edge)], [`Best · ${m.bestBook}`, formatAmerican(m.bestAmerican)] ].map(([k, v]) => (
            <div key={k} className="border border-[#1c2129] bg-[#0d0f13] px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6470]">{k}</div>
              <div className={`mt-1 font-mono text-2xl ${k === "Edge" && m.edge >= 0.03 ? "text-[#c8f542]" : ""}`}>{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="border border-[#1c2129] bg-[#0d0f13] px-4 py-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5b6470]">Why the gap exists</h2>
              <ul className="mt-3 space-y-2">{m.reasons.map((r) => <li key={r} className="text-[14px] leading-6 text-[#c5ccd4]">{r}</li>)}</ul>
            </section>
            <section className="border border-[#1c2129] bg-[#0d0f13] px-4 py-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5b6470]">What kills it</h2>
              <ul className="mt-3 space-y-2">{m.risks.map((r) => <li key={r} className="text-[14px] leading-6 text-[#c5ccd4]">{r}</li>)}</ul>
            </section>
          </div>
          <div className="space-y-6">
            <section className="border border-[#1c2129] bg-[#0d0f13] px-4 py-4">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5b6470]">Board</h2>
              <ul className="mt-3 divide-y divide-[#1c2129]">
                {m.books.map((b) => (
                  <li key={b.book} className="flex items-center justify-between py-2 text-[13px]">
                    <span className="text-[#9aa3ad]">{b.book}</span>
                    <span className={`font-mono ${b.book === m.bestBook ? "text-[#c8f542]" : ""}`}>{formatAmerican(b.american)}</span>
                  </li>
                ))}
              </ul>
            </section>
            <Analyst market={m} />
          </div>
        </div>
      </main>
    </div>
  );
}
