import { describe, expect, it } from "vitest";

import { rollDualityDice } from "../../../../src/engine/dice/duality-dice";

// Returns a roll function that yields values in order
function seq(...values: number[]) {
  let index = 0;
  return () => values[index++];
}

describe("rollDualityDice", () => {
  it("returns hope as the first die and fear as the second", () => {
    const roll = rollDualityDice(seq(8, 5));
    expect(roll.hope).toBe(8);
    expect(roll.fear).toBe(5);
  });

  it("total is the sum of hope and fear", () => {
    const roll = rollDualityDice(seq(8, 5));
    expect(roll.total).toBe(13);
  });

  it("isCritical is true when both dice show the same value", () => {
    const roll = rollDualityDice(seq(6, 6));
    expect(roll.isCritical).toBe(true);
  });

  it("isCritical is false when dice differ", () => {
    const roll = rollDualityDice(seq(6, 7));
    expect(roll.isCritical).toBe(false);
  });

  it("withHope is true when hope die exceeds fear die", () => {
    const roll = rollDualityDice(seq(9, 4));
    expect(roll.withHope).toBe(true);
  });

  it("withHope is false when fear die exceeds hope die", () => {
    const roll = rollDualityDice(seq(4, 9));
    expect(roll.withHope).toBe(false);
  });

  it("withHope is false on a critical (dice are equal)", () => {
    const roll = rollDualityDice(seq(7, 7));
    expect(roll.withHope).toBe(false);
  });

  it("withFear is true when fear die exceeds hope die", () => {
    const roll = rollDualityDice(seq(4, 9));
    expect(roll.withFear).toBe(true);
  });

  it("withFear is false when hope die exceeds fear die", () => {
    const roll = rollDualityDice(seq(9, 4));
    expect(roll.withFear).toBe(false);
  });

  it("withFear is false on a critical (dice are equal)", () => {
    const roll = rollDualityDice(seq(7, 7));
    expect(roll.withFear).toBe(false);
  });

  it("uses a d12 by default", () => {
    const roll = rollDualityDice();
    expect(roll.hope).toBeGreaterThanOrEqual(1);
    expect(roll.hope).toBeLessThanOrEqual(12);
    expect(roll.fear).toBeGreaterThanOrEqual(1);
    expect(roll.fear).toBeLessThanOrEqual(12);
  });
});
