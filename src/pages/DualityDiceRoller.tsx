import { useState } from "react";

import Button from "../components/Button";
import DualityRollHistory from "../components/DualityRollHistory";
import DualityRollResult from "../components/DualityRollResult";
import { type DualityRoll, rollDualityDice } from "../engine";

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
        {rolls.length > 0 && <DualityRollResult roll={rolls[0]} />}
        {rolls.length > 0 && <DualityRollHistory rolls={rolls} />}
      </div>

      <div className="flex justify-center py-4">
        <Button onClick={handleRoll}>Roll the Dice</Button>
      </div>
    </div>
  );
}
