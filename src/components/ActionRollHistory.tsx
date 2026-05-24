import type { ActionRoll, ActionRollOutcome } from "../engine";
import OutcomeBadge from "./OutcomeBadge";

const OUTCOME_LABEL: Record<ActionRollOutcome, string> = {
  critical: "⚡ Critical Success!",
  "success-hope": "✓ Success  🪽 Hope",
  "success-fear": "✓ Success  💀 Fear",
  "failure-hope": "✗ Failure  🪽 Hope",
  "failure-fear": "✗ Failure  💀 Fear",
};

const OUTCOME_VARIANT: Record<ActionRollOutcome, "critical" | "hope" | "fear"> =
  {
    critical: "critical",
    "success-hope": "hope",
    "success-fear": "fear",
    "failure-hope": "hope",
    "failure-fear": "fear",
  };

export default function ActionRollHistory({
  history,
}: {
  history: ActionRoll[];
}) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 text-center mb-4">
        Roll History
      </h2>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-3 px-4 text-left text-slate-500 font-semibold">
                #
              </th>
              <th className="py-3 px-4 text-center text-hope font-semibold">
                Hope
              </th>
              <th className="py-3 px-4 text-center text-fear font-semibold">
                Fear
              </th>
              <th className="py-3 px-4 text-center text-slate-500 font-semibold">
                Total
              </th>
              <th className="py-3 px-4 text-center text-slate-500 font-semibold">
                DC
              </th>
              <th className="py-3 px-4 text-right text-slate-500 font-semibold">
                Outcome
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {history.map((roll, index) => (
              <tr key={roll.id} className="even:bg-white/[0.025]">
                <td className="py-3 px-4 text-slate-400">
                  {history.length - index}
                </td>
                <td className="py-3 px-4 text-center font-semibold text-hope">
                  {roll.hope}
                </td>
                <td className="py-3 px-4 text-center font-semibold text-fear">
                  {roll.fear}
                </td>
                <td className="py-3 px-4 text-center text-slate-300">
                  {roll.total}
                </td>
                <td className="py-3 px-4 text-center text-slate-500">
                  {roll.difficulty}
                </td>
                <td className="py-3 px-4 text-right">
                  <OutcomeBadge
                    variant={OUTCOME_VARIANT[roll.outcome]}
                    label={OUTCOME_LABEL[roll.outcome]}
                    size="sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
