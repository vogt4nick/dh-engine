import { useState } from "react";

import {
  type ActionRoll,
  type ActionRollOutcome,
  rollActionRoll,
} from "../engine";
import Button from "./Button";
import Die from "./Die";

function FormField({
  label,
  ...inputProperties
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-bold tracking-[0.1em] uppercase text-slate-500">
      {label}
      <input
        className="px-3 py-2.5 text-base bg-slate-800 text-slate-100 border border-slate-700 rounded-lg w-24 focus:outline-none focus:border-slate-500"
        {...inputProperties}
      />
    </label>
  );
}

const OUTCOME_LABEL: Record<ActionRollOutcome, string> = {
  critical: "⚡ Critical Success!",
  "success-hope": "✓ Success  🪽 Hope",
  "success-fear": "✓ Success  💀 Fear",
  "failure-hope": "✗ Failure  🪽 Hope",
  "failure-fear": "✗ Failure  💀 Fear",
};

export default function ActionRoller() {
  const [traitModifier, setTraitModifier] = useState(0);
  const [difficulty, setDifficulty] = useState(12);
  const [bonus, setBonus] = useState(0);
  const [history, setHistory] = useState<ActionRoll[]>([]);

  function handleRoll() {
    const roll = rollActionRoll({ traitModifier, bonus, difficulty });
    setHistory((prev) => [roll, ...prev]);
  }

  return (
    <div className="flex flex-col items-center gap-8 px-6 py-12 min-h-screen text-slate-100">
      <h1 className="font-display text-4xl font-bold tracking-wide text-slate-100">
        Action Roll
      </h1>

      <div className="flex gap-6">
        <FormField
          label="Modifier"
          type="number"
          value={traitModifier}
          onChange={(e) => {
            setTraitModifier(Number(e.target.value));
          }}
        />
        <FormField
          label="Difficulty"
          type="number"
          min={1}
          value={difficulty}
          onChange={(e) => {
            setDifficulty(Number(e.target.value));
          }}
        />
        <FormField
          label="Bonus"
          type="number"
          value={bonus}
          onChange={(e) => {
            setBonus(Number(e.target.value));
          }}
        />
      </div>

      <Button onClick={handleRoll}>Roll</Button>

      {history.length > 0 && <RollResult roll={history[0]} />}
      {history.length > 0 && <RollHistory history={history} />}
    </div>
  );
}

function RollResult({ roll }: { roll: ActionRoll }) {
  const withHope =
    roll.outcome === "success-hope" || roll.outcome === "failure-hope";
  const cardBorder = roll.isSuccess
    ? "bg-green-500/[0.08] border-green-500/20"
    : "bg-fear/[0.08] border-fear/20";

  return (
    <div
      className={`w-full max-w-sm border rounded-2xl p-8 flex flex-col items-center gap-6 shadow-xl ${cardBorder}`}
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

function RollHistory({ history }: { history: ActionRoll[] }) {
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
            {history.map((roll, index) => {
              let outcomeBadge = "bg-fear/15 border-fear/40 text-fear";
              if (roll.outcome === "critical") {
                outcomeBadge =
                  "bg-critical/15 border-critical/40 text-critical";
              } else if (roll.isSuccess) {
                outcomeBadge = "bg-hope/15 border-hope/40 text-hope";
              }
              return (
                <tr key={index} className="even:bg-white/[0.025]">
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
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${outcomeBadge}`}
                    >
                      {OUTCOME_LABEL[roll.outcome]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
