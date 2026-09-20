export function ActionBadge({ action }: { action: "PLAY" | "PASS" }) {
  const play = action === "PLAY";
  return (
    <span
      className={`inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[11px] tracking-wider ${
        play ? "bg-[#c8f542]/15 text-[#c8f542]" : "bg-[#2a3038] text-[#9aa3ad]"
      }`}
    >
      {action}
    </span>
  );
}

export function ResultBadge({
  result,
}: {
  result: "WIN" | "LOSS" | "PUSH" | "PENDING";
}) {
  const map = {
    WIN: "text-[#c8f542] bg-[#c8f542]/10",
    LOSS: "text-[#ff6b6b] bg-[#ff6b6b]/10",
    PUSH: "text-[#c9c14a] bg-[#c9c14a]/10",
    PENDING: "text-[#8b93a1] bg-[#2a3038]",
  };
  return (
    <span className={`inline-flex rounded-sm px-1.5 py-0.5 font-mono text-[11px] ${map[result]}`}>
      {result}
    </span>
  );
}

export function QualityBadge({ q }: { q: "High" | "Medium" | "Thin" }) {
  const color =
    q === "High" ? "text-[#c8f542]" : q === "Medium" ? "text-[#c9c14a]" : "text-[#ff8a5b]";
  return <span className={`font-mono text-[11px] ${color}`}>{q}</span>;
}
