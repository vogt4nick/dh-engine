import { useState } from "react";

import ActionRollHistory from "../components/ActionRollHistory";
import ActionRollResult from "../components/ActionRollResult";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { type ActionRoll, rollActionRoll } from "../engine";

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

      {history.length > 0 && <ActionRollResult roll={history[0]} />}
      {history.length > 0 && <ActionRollHistory history={history} />}
    </div>
  );
}
