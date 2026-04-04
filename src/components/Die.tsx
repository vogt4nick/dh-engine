const VARIANT_CLASSES: Record<"hope" | "fear", { label: string; box: string }> =
  {
    hope: {
      label: "text-hope",
      box: "border-hope text-hope bg-hope/10 shadow-[0_0_18px_2px_rgba(74,158,255,0.2)]",
    },
    fear: {
      label: "text-fear",
      box: "border-fear text-fear bg-fear/10 shadow-[0_0_18px_2px_rgba(224,92,92,0.2)]",
    },
  };

export default function Die({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "hope" | "fear";
}) {
  const classes = VARIANT_CLASSES[variant];
  return (
    <div
      data-testid={`die-${label.toLowerCase()}`}
      className="flex flex-col items-center gap-2"
    >
      <span
        className={`text-xs font-bold tracking-[0.2em] uppercase ${classes.label}`}
      >
        {label}
      </span>
      <div
        className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center text-3xl font-bold ${classes.box}`}
      >
        {value}
      </div>
    </div>
  );
}
