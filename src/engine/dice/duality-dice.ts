import { parseDice, rollDice } from "./dice-expression";

export type DualityOutcome = "critical" | "hope" | "fear";

export interface DualityRoll {
  hope: number;
  fear: number;
  total: number;
  outcome: DualityOutcome;
  isCritical: boolean;
  withHope: boolean;
  withFear: boolean;
}

type RollFunction = () => number;

const d12 = parseDice("1d12");

export function rollDualityDice(
  rollFunction: RollFunction = () => rollDice(d12).total,
): DualityRoll {
  const hope = rollFunction();
  const fear = rollFunction();
  const isCritical = hope === fear;
  const withHope = hope > fear;
  let outcome: DualityOutcome;
  if (isCritical) {
    outcome = "critical";
  } else {
    outcome = withHope ? "hope" : "fear";
  }
  return {
    hope,
    fear,
    total: hope + fear,
    outcome,
    isCritical,
    withHope,
    withFear: fear > hope,
  };
}
