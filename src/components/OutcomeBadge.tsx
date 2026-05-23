type OutcomeVariant = "critical" | "hope" | "fear";

const BADGE_CLASSES: Record<OutcomeVariant, string> = {
  critical:
    "bg-critical/15 border-critical/40 text-critical animate-[pulse-gold_2s_ease-in-out_infinite]",
  hope: "bg-hope/15 border-hope/40 text-hope",
  fear: "bg-fear/15 border-fear/40 text-fear",
};

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-6 py-2 text-lg",
};

export default function OutcomeBadge({
  variant,
  label,
  size = "md",
}: {
  variant: OutcomeVariant;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`rounded-full border font-bold tracking-wider whitespace-nowrap ${SIZE_CLASSES[size]} ${BADGE_CLASSES[variant]}`}
    >
      {label}
    </div>
  );
}
