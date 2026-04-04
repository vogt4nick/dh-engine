export interface DiceTerm {
  count: number;
  sides: number;
}

export interface DiceExpression {
  notation: string;
  terms: DiceTerm[];
  modifier: number;
}

export interface TermRoll {
  sides: number;
  results: number[];
}

export interface DiceRoll {
  notation: string;
  rolls: TermRoll[];
  modifier: number;
  total: number;
}

type RollFunction = (sides: number) => number;

// Validates: one or more NdX/dX/N terms joined by + or -, no other syntax
const EXPRESSION_RE = /^(\d*d\d+|\d+)(\+(\d*d\d+|\d+)|(-\d+(?!\d*d)))*$/i;

// Matches each signed term; dice alternative must come first to beat plain-number alternative
const TERM_RE =
  /(?<diceSign>[+-]?)(?<count>\d*)d(?<sides>\d+)|(?<constSign>[+-]?)(?<value>\d+)/g;

export function parseDice(notation: string): DiceExpression {
  const normalized = notation.replaceAll(/\s+/g, "");

  if (!EXPRESSION_RE.test(normalized)) {
    throw new Error(`Unsupported dice notation: "${notation}"`);
  }

  const terms: DiceTerm[] = [];
  let modifier = 0;

  for (const match of normalized.matchAll(TERM_RE)) {
    const { count, sides, constSign, value } = match.groups as Record<
      string,
      string
    >;

    if (sides) {
      terms.push({
        count: count ? Number.parseInt(count, 10) : 1,
        sides: Number.parseInt(sides, 10),
      });
    } else {
      const sign = constSign === "-" ? -1 : 1;
      modifier += sign * Number.parseInt(value, 10);
    }
  }

  return { notation, terms, modifier };
}

export function rollDice(
  exp: DiceExpression,
  rollFunction: RollFunction = (sides) => Math.ceil(Math.random() * sides),
): DiceRoll {
  const rolls: TermRoll[] = exp.terms.map(({ count, sides }) => ({
    sides,
    results: Array.from({ length: count }, () => rollFunction(sides)),
  }));

  const diceTotal = rolls.reduce(
    (sum, roll) => sum + roll.results.reduce((s, r) => s + r, 0),
    0,
  );

  return {
    notation: exp.notation,
    rolls,
    modifier: exp.modifier,
    total: diceTotal + exp.modifier,
  };
}
