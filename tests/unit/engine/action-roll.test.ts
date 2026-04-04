import { describe, expect, it } from "vitest";

import { rollActionRoll } from "../../../src/engine/action-roll";

// Returns a roll function that yields values in order (hope die, then fear die)
function seq(...values: number[]) {
  let index = 0;
  return () => values[index++];
}

const BASE = { traitModifier: 0, bonus: 0, difficulty: 12 };

describe("rollActionRoll", () => {
  it("returns the correct hope and fear values", () => {
    const roll = rollActionRoll(BASE, seq(8, 5));
    expect(roll.hope).toBe(8);
    expect(roll.fear).toBe(5);
  });

  it("total is duality total plus traitModifier and bonus", () => {
    const roll = rollActionRoll(
      { traitModifier: 2, bonus: 1, difficulty: 12 },
      seq(6, 4),
    );
    expect(roll.total).toBe(6 + 4 + 2 + 1);
  });

  it("outcome is critical when dice match", () => {
    const roll = rollActionRoll(BASE, seq(6, 6));
    expect(roll.outcome).toBe("critical");
    expect(roll.isSuccess).toBe(true);
  });

  it("critical is a success even when total is below difficulty", () => {
    const roll = rollActionRoll(
      { traitModifier: 0, bonus: 0, difficulty: 99 },
      seq(1, 1),
    );
    expect(roll.outcome).toBe("critical");
    expect(roll.isSuccess).toBe(true);
  });

  it("outcome is success-hope when total meets difficulty and hope > fear", () => {
    // hope=9, fear=4, total=13 >= difficulty=12
    const roll = rollActionRoll(BASE, seq(9, 4));
    expect(roll.outcome).toBe("success-hope");
    expect(roll.isSuccess).toBe(true);
  });

  it("outcome is success-fear when total meets difficulty and fear > hope", () => {
    // hope=4, fear=9, total=13 >= difficulty=12
    const roll = rollActionRoll(BASE, seq(4, 9));
    expect(roll.outcome).toBe("success-fear");
    expect(roll.isSuccess).toBe(true);
  });

  it("outcome is failure-hope when total is below difficulty and hope > fear", () => {
    // hope=7, fear=3, total=10 < difficulty=12
    const roll = rollActionRoll(BASE, seq(7, 3));
    expect(roll.outcome).toBe("failure-hope");
    expect(roll.isSuccess).toBe(false);
  });

  it("outcome is failure-fear when total is below difficulty and fear > hope", () => {
    // hope=3, fear=7, total=10 < difficulty=12
    const roll = rollActionRoll(BASE, seq(3, 7));
    expect(roll.outcome).toBe("failure-fear");
    expect(roll.isSuccess).toBe(false);
  });

  it("traitModifier and bonus are reflected on the returned roll", () => {
    const roll = rollActionRoll(
      { traitModifier: 3, bonus: -1, difficulty: 12 },
      seq(5, 5),
    );
    expect(roll.traitModifier).toBe(3);
    expect(roll.bonus).toBe(-1);
  });

  it("difficulty is reflected on the returned roll", () => {
    const roll = rollActionRoll({ ...BASE, difficulty: 15 }, seq(8, 5));
    expect(roll.difficulty).toBe(15);
  });

  it("uses duality dice by default (d12 range)", () => {
    const roll = rollActionRoll(BASE);
    expect(roll.hope).toBeGreaterThanOrEqual(1);
    expect(roll.hope).toBeLessThanOrEqual(12);
    expect(roll.fear).toBeGreaterThanOrEqual(1);
    expect(roll.fear).toBeLessThanOrEqual(12);
  });
});
