import type { DualityOutcome, DualityRoll } from "../engine";
import OutcomeBadge from "./OutcomeBadge";

const OUTCOME_LABEL: Record<DualityOutcome, string> = {
  critical: "Critical!",
  hope: "With Hope",
  fear: "With Fear",
};

export default function DualityRollHistory({
  rolls,
}: {
  rolls: DualityRoll[];
}) {
  return (
    <div className="w-full max-w-sm">
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
              <th className="py-3 px-4 text-right text-slate-500 font-semibold">
                Outcome
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rolls.map((r, index) => (
              <tr key={index} className="even:bg-white/[0.025]">
                <td className="py-3 px-4 text-slate-400">
                  {rolls.length - index}
                </td>
                <td className="py-3 px-4 text-center font-semibold text-hope">
                  {r.hope}
                </td>
                <td className="py-3 px-4 text-center font-semibold text-fear">
                  {r.fear}
                </td>
                <td className="py-3 px-4 text-center text-slate-300">
                  {r.total}
                </td>
                <td className="py-3 px-4 text-right">
                  <OutcomeBadge
                    variant={r.outcome}
                    label={OUTCOME_LABEL[r.outcome]}
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
