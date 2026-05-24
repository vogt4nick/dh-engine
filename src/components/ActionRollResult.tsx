import type { ActionRoll, ActionRollOutcome } from "../engine";
import Die from "./Die";

const RESULT_CARD: Record<ActionRollOutcome, string> = {
  critical: "bg-critical/[0.08] border-critical/20",
  "success-hope": "bg-green-500/[0.08] border-green-500/20",
  "success-fear": "bg-green-500/[0.08] border-green-500/20",
  "failure-hope": "bg-fear/[0.08] border-fear/20",
  "failure-fear": "bg-fear/[0.08] border-fear/20",
};

export default function ActionRollResult({ roll }: { roll: ActionRoll }) {
  const withHope =
    roll.outcome === "success-hope" || roll.outcome === "failure-hope";

  return (
    <div
      className={`w-full max-w-sm border rounded-2xl p-8 flex flex-col items-center gap-6 shadow-xl ${RESULT_CARD[roll.outcome]}`}
    >
      <div className="flex gap-10 items-end">
        <Die label="Hope" value={roll.hope} variant="hope" />
        <span className="pb-4 text-slate-600 font-bold text-lg select-none">
          vs
        </span>
        <Die label="Fear" value={roll.fear} variant="fear" />
      </div>

      <div className="flex gap-2 items-center text-base text-slate-400 flex-wrap justify-center">
        <span>
          {roll.hope} + {roll.fear}
        </span>
        {roll.traitModifier !== 0 && (
          <span>
            {roll.traitModifier > 0 ? "+" : ""}
            {roll.traitModifier}
          </span>
        )}
        {roll.bonus !== 0 && (
          <span>
            {roll.bonus > 0 ? "+" : ""}
            {roll.bonus} (bonus)
          </span>
        )}
        <span className="text-slate-200">= {roll.total}</span>
        <span className="text-slate-500">vs {roll.difficulty}</span>
      </div>

      {roll.outcome === "critical" ? (
        <div className="text-2xl font-bold tracking-wide text-critical animate-[pulse-gold_2s_ease-in-out_infinite]">
          ⚡ Critical Success!
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div
            className={`text-2xl font-bold tracking-wide ${roll.isSuccess ? "text-slate-200" : "text-fear"}`}
          >
            {roll.isSuccess ? "✓ Success" : "✗ Failure"}
          </div>
          <div
            className={`text-lg font-bold tracking-wide ${withHope ? "text-hope" : "text-fear"}`}
          >
            {withHope ? "🪽 Hope" : "💀 Fear"}
          </div>
        </div>
      )}
    </div>
  );
}
