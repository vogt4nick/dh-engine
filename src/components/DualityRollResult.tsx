import type { DualityOutcome, DualityRoll } from "../engine";
import Die from "./Die";
import OutcomeBadge from "./OutcomeBadge";

const OUTCOME_LABEL: Record<DualityOutcome, string> = {
  critical: "Critical Success!",
  hope: "With Hope",
  fear: "With Fear",
};

export default function DualityRollResult({ roll }: { roll: DualityRoll }) {
  return (
    <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-xl">
      <div className="flex gap-10 items-end">
        <Die label="Hope" value={roll.hope} variant="hope" />
        <span className="pb-4 text-slate-600 font-bold text-lg select-none">
          vs
        </span>
        <Die label="Fear" value={roll.fear} variant="fear" />
      </div>

      <p className="text-slate-400 text-sm">
        Total:{" "}
        <span className="text-slate-200 font-semibold text-base">
          {roll.total}
        </span>
      </p>

      <OutcomeBadge
        variant={roll.outcome}
        label={OUTCOME_LABEL[roll.outcome]}
      />
    </div>
  );
}
