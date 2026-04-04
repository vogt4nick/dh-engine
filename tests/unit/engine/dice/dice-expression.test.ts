import { describe, expect, it } from "vitest";

import {
  parseDice,
  rollDice,
} from "../../../../src/engine/dice/dice-expression";

function fixed(...values: number[]) {
  let index = 0;
  return () => {
    if (index >= values.length)
      throw new Error(`fixed() exhausted after ${values.length} values`);
    return values[index++];
  };
}

describe("parseDice", () => {
  describe("unsupported expressions throw", () => {
    it("throws on an empty string", () => {
      expect(() => parseDice("")).toThrow();
    });

    it("throws on incomplete die notation with no sides", () => {
      expect(() => parseDice("1d")).toThrow();
    });

    it("throws on a leading negative die term", () => {
      expect(() => parseDice("-2d6")).toThrow();
    });

    it("throws on negative dice terms", () => {
      expect(() => parseDice("2d6-1d4")).toThrow();
    });

    it("throws on adjacent terms with no operator", () => {
      expect(() => parseDice("2d6 2d8")).toThrow();
    });

    it("throws on a trailing operator", () => {
      expect(() => parseDice("2d6+")).toThrow();
    });

    it("throws on multiplication", () => {
      expect(() => parseDice("2d6*2")).toThrow();
    });

    it("throws on arbitrary text", () => {
      expect(() => parseDice("roll some dice")).toThrow();
    });
  });

  describe("successful parse", () => {
    it("parses dice terms and modifier", () => {
      const parsed = parseDice("2d6+3");
      expect(parsed.terms).toEqual([{ count: 2, sides: 6 }]);
      expect(parsed.modifier).toBe(3);
    });

    it("preserves the original notation string including spaces", () => {
      const parsed = parseDice("2d6 + 3");
      expect(parsed.notation).toBe("2d6 + 3");
    });
  });
});

describe("rollDice", () => {
  describe("single die group", () => {
    it("rolls 1d6 and records the full result", () => {
      const outcome = rollDice(parseDice("1d6"), fixed(5));
      expect(outcome.rolls).toHaveLength(1);
      expect(outcome.rolls[0].sides).toBe(6);
      expect(outcome.rolls[0].results).toEqual([5]);
      expect(outcome.total).toBe(5);
      expect(outcome.modifier).toBe(0);
    });

    it("treats d6 as 1d6", () => {
      const outcome = rollDice(parseDice("d6"), fixed(5));
      expect(outcome.rolls[0].results).toEqual([5]);
      expect(outcome.total).toBe(5);
    });
  });

  describe("multiple dice in one group", () => {
    it("rolls all dice in the group", () => {
      const outcome = rollDice(parseDice("3d6"), fixed(1, 2, 3));
      expect(outcome.rolls[0].results).toEqual([1, 2, 3]);
    });

    it("total is the sum of all rolls", () => {
      const outcome = rollDice(parseDice("3d6"), fixed(1, 2, 3));
      expect(outcome.total).toBe(6);
    });
  });

  describe("modifiers", () => {
    it("returns no rolls and modifier equals the constant", () => {
      const outcome = rollDice(parseDice("5"));
      expect(outcome.rolls).toHaveLength(0);
      expect(outcome.modifier).toBe(5);
      expect(outcome.total).toBe(5);
    });

    it("adds the constant to total", () => {
      const outcome = rollDice(parseDice("2d6+3"), fixed(4, 5));
      expect(outcome.modifier).toBe(3);
      expect(outcome.total).toBe(12);
    });

    it("subtracts the constant from total", () => {
      const outcome = rollDice(parseDice("1d8-2"), fixed(6));
      expect(outcome.modifier).toBe(-2);
      expect(outcome.total).toBe(4);
    });

    it("sums multiple positive constants into modifier", () => {
      const outcome = rollDice(parseDice("1d6+3+2"), fixed(4));
      expect(outcome.modifier).toBe(5);
      expect(outcome.total).toBe(9);
    });

    it("sums mixed-sign constants into modifier", () => {
      const outcome = rollDice(parseDice("1d6+3-1"), fixed(4));
      expect(outcome.modifier).toBe(2);
      expect(outcome.total).toBe(6);
    });
  });

  describe("multiple die groups", () => {
    it("records a roll entry per group", () => {
      const outcome = rollDice(parseDice("1d6+1d8"), fixed(3, 5));
      expect(outcome.rolls).toHaveLength(2);
      expect(outcome.rolls[0].sides).toBe(6);
      expect(outcome.rolls[1].sides).toBe(8);
    });

    it("total is the sum of all groups", () => {
      const outcome = rollDice(parseDice("1d6+1d8"), fixed(3, 5));
      expect(outcome.total).toBe(8);
    });
  });

  describe("multiple die groups with modifier", () => {
    it("sums all dice and the flat modifier", () => {
      const outcome = rollDice(parseDice("2d6+1d8+3"), fixed(4, 5, 7));
      expect(outcome.modifier).toBe(3);
      expect(outcome.total).toBe(19);
    });
  });

  describe("whitespace tolerance", () => {
    it("ignores spaces in the expression", () => {
      const outcome = rollDice(parseDice("2d6 + 3"), fixed(4, 5));
      expect(outcome.total).toBe(12);
    });
  });
});
