import { rollDualityDice } from "./dice/duality-dice";

export type ActionRollOutcome =
  | "critical"
  | "success-hope"
  | "success-fear"
  | "failure-hope"
  | "failure-fear";

export interface ActionRollInput {
  traitModifier: number;
  bonus: number;
  difficulty: number;
}

export interface ActionRoll {
  id: string;
  hope: number;
  fear: number;
  traitModifier: number;
  bonus: number;
  total: number;
  difficulty: number;
  isSuccess: boolean;
  outcome: ActionRollOutcome;
}

type RollFunction = () => number;

export function rollActionRoll(
  { traitModifier, bonus, difficulty }: ActionRollInput,
  rollFunction?: RollFunction,
): ActionRoll {
  const duality = rollDualityDice(rollFunction);
  const total = duality.total + traitModifier + bonus;
  const isSuccess = duality.isCritical || total >= difficulty;

  let outcome: ActionRollOutcome;
  if (duality.isCritical) {
    outcome = "critical";
  } else if (isSuccess && duality.withHope) {
    outcome = "success-hope";
  } else if (isSuccess) {
    outcome = "success-fear";
  } else if (duality.withHope) {
    outcome = "failure-hope";
  } else {
    outcome = "failure-fear";
  }

  return {
    id: crypto.randomUUID(),
    hope: duality.hope,
    fear: duality.fear,
    traitModifier,
    bonus,
    total,
    difficulty,
    isSuccess,
    outcome,
  };
}
