import { useState } from "react";

import {
  type DualityOutcome,
  type DualityRoll,
  rollDualityDice,
} from "../engine";
import Button from "./Button";
import Die from "./Die";

const OUTCOME_LABEL: Record<DualityOutcome, string> = {
  critical: "Critical Success!",
  hope: "With Hope",
  fear: "With Fear",
};

const OUTCOME_BADGE: Record<DualityOutcome, string> = {
  critical:
    "bg-critical/15 border-critical/40 text-critical animate-[pulse-gold_2s_ease-in-out_infinite]",
  hope: "bg-hope/15 border-hope/40 text-hope",
  fear: "bg-fear/15 border-fear/40 text-fear",
};

export default function DualityDiceRoller() {
  const [rolls, setRolls] = useState<DualityRoll[]>([]);

  function handleRoll() {
    setRolls((prev) => [rollDualityDice(), ...prev]);
  }

  return (
    <div className="flex flex-col items-center gap-8 px-6 py-12 min-h-screen bg-[#0f1117] text-slate-100">
      <h1 className="font-display text-4xl font-bold tracking-wide text-slate-100">
        Duality Dice
      </h1>

      <Button onClick={handleRoll}>Roll the Dice</Button>

      {rolls.length > 0 && <RollResult roll={rolls[0]} />}
      {rolls.length > 0 && <RollHistory rolls={rolls} />}
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

      <div
        className={`px-6 py-2 rounded-full border font-bold tracking-wider text-lg ${OUTCOME_BADGE[roll.outcome]}`}
      >
        {OUTCOME_LABEL[roll.outcome]}
      </div>
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
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${OUTCOME_BADGE[r.outcome]}`}
                  >
                    {r.outcome === "critical"
                      ? "Critical!"
                      : OUTCOME_LABEL[r.outcome]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
