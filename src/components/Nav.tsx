import Link from "next/link";

export function Nav({ active }: { active?: "home" | "board" | "ledger" }) {
  const item = (href: string, key: string, label: string) => (
    <Link
      href={href}
      className={`text-[13px] tracking-wide ${
        active === key ? "text-[#e8edf2]" : "text-[#8b93a1] hover:text-[#e8edf2]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-20 border-b border-[#1c2129] bg-[#07080a]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#c8f542]" />
          <span className="font-medium tracking-[0.18em] text-[13px] text-[#e8edf2]">
            CLOSEBOARD
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {item("/board", "board", "Board")}
          {item("/ledger", "ledger", "Public ledger")}
          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-[#5b6470] sm:inline">
            Demo data · research only
          </span>
        </nav>
      </div>
    </header>
  );
}
