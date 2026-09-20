import Link from "next/link";
import { Nav } from "@/components/Nav";
import { LEDGER, PRODUCT, SLATE, ledgerStats } from "@/lib/data";
import { formatEdge, formatPct } from "@/lib/format";

export default function Home() {
  const stats = ledgerStats(LEDGER);
  const plays = SLATE.filter((m) => m.action === "PLAY");
  return (
    <div>
      <Nav active="home" />
      <main className="mx-auto max-w-6xl px-5">
        <section className="grid gap-12 border-b border-[#1c2129] py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8f542]">Research terminal · not a tipster</p>
            <h1 className="max-w-xl text-4xl leading-[1.1] tracking-tight text-[#f3f6f8] md:text-5xl">{PRODUCT.line}</h1>
            <p className="mt-5 max-w-lg text-[16px] leading-7 text-[#9aa3ad]">{PRODUCT.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/board" className="bg-[#c8f542] px-4 py-2 text-[13px] font-medium text-[#07080a]">Open today&apos;s board</Link>
              <Link href="/ledger" className="border border-[#2a313b] px-4 py-2 text-[13px] text-[#e8edf2]">Audit the public ledger</Link>
            </div>
            <p className="mt-6 max-w-lg text-[12px] leading-5 text-[#5b6470]">MVP uses simulated market data. Live books need an odds API key. Research software only. 18+.</p>
          </div>
          <div className="border border-[#1c2129] bg-[#0d0f13] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5b6470]">Process card · last published plays</p>
            <dl className="mt-5 grid grid-cols-2 gap-y-5">
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6470]">Sample</dt><dd className="mt-1 font-mono text-2xl">{stats.sample}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6470]">Beat the close</dt><dd className="mt-1 font-mono text-2xl">{formatPct(stats.beatClose, 0)}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6470]">Avg CLV</dt><dd className="mt-1 font-mono text-2xl">{stats.avgClv > 0 ? "+" : ""}{stats.avgClv.toFixed(0)}¢</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6470]">Units</dt><dd className="mt-1 font-mono text-2xl">{stats.units > 0 ? "+" : ""}{stats.units.toFixed(2)}</dd></div>
            </dl>
            <p className="mt-6 text-[12px] leading-5 text-[#6b7380]">Hit rate is noise. Closing-line value is the scoreboard.</p>
          </div>
        </section>
        <section className="grid gap-10 py-14 md:grid-cols-3">
          <div><p className="font-mono text-[11px] text-[#c8f542]">01</p><h3 className="mt-2 text-[16px]">Price</h3><p className="mt-2 text-[13px] leading-6 text-[#8b93a1]">Same side at two books is two different bets.</p></div>
          <div><p className="font-mono text-[11px] text-[#c8f542]">02</p><h3 className="mt-2 text-[16px]">Disagreement</h3><p className="mt-2 text-[13px] leading-6 text-[#8b93a1]">Model vs market, in percentage points. No locks.</p></div>
          <div><p className="font-mono text-[11px] text-[#c8f542]">03</p><h3 className="mt-2 text-[16px]">The close</h3><p className="mt-2 text-[13px] leading-6 text-[#8b93a1]">Every published lean is graded. Misses stay on the page.</p></div>
        </section>
        <section className="border-t border-[#1c2129] py-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl">Today&apos;s disagreement</h2>
              <p className="mt-1 text-[13px] text-[#8b93a1]">{plays.length} plays · {SLATE.length - plays.length} passes · threshold 3.0 pp</p>
            </div>
            <Link href="/board" className="text-[13px] text-[#c8f542]">Full board →</Link>
          </div>
          <div className="divide-y divide-[#1c2129] border border-[#1c2129]">
            {SLATE.map((m) => (
              <Link key={m.id} href={`/brief/${m.id}`} className="grid grid-cols-12 items-center gap-3 px-4 py-3 text-[13px] hover:bg-[#10131a]">
                <span className="col-span-5">{m.home} vs {m.away}<span className="mt-0.5 block text-[11px] text-[#6b7380]">{m.league} · {m.selection}</span></span>
                <span className="col-span-2 font-mono text-[#9aa3ad]">{m.bestBook}</span>
                <span className={`col-span-3 font-mono ${m.edge >= 0.03 ? "text-[#c8f542]" : "text-[#8b93a1]"}`}>{formatEdge(m.edge)}</span>
                <span className="col-span-2 text-right font-mono text-[#9aa3ad]">{m.action}</span>
              </Link>
            ))}
          </div>
        </section>
        <footer className="border-t border-[#1c2129] py-8 text-[12px] text-[#5b6470]">Closeboard is a research prototype. Not a sportsbook and not a promise of profit.</footer>
      </main>
    </div>
  );
}
