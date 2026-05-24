import { useState } from "react";

import Button from "../components/Button";
import Die from "../components/Die";
import OutcomeBadge from "../components/OutcomeBadge";
import {
  type DualityOutcome,
  type DualityRoll,
  rollDualityDice,
} from "../engine";

const OUTCOME_LABEL: Record<DualityOutcome, string> = {
  critical: "Critical Success!",
  hope: "With Hope",
  fear: "With Fear",
};

export default function DualityDiceRoller() {
  const [rolls, setRolls] = useState<DualityRoll[]>([]);

  function handleRoll() {
    setRolls((prev) => [rollDualityDice(), ...prev]);
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-full px-6 py-12 bg-[#0f1117] text-slate-100">
      <h1 className="font-display text-4xl font-bold tracking-wide text-slate-100 text-center">
        Duality Dice
      </h1>

      <div className="flex flex-col items-center gap-8 py-8 overflow-y-auto">
        {rolls.length > 0 && <RollResult roll={rolls[0]} />}
        {rolls.length > 0 && <RollHistory rolls={rolls} />}
      </div>

      <div className="flex justify-center py-4">
        <Button onClick={handleRoll}>Roll the Dice</Button>
      </div>
    </div>
  );
}

function RollResult({ roll }: { roll: DualityRoll }) {
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

function RollHistory({ rolls }: { rolls: DualityRoll[] }) {
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
                    label={
                      r.outcome === "critical"
                        ? "Critical!"
                        : OUTCOME_LABEL[r.outcome]
                    }
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
