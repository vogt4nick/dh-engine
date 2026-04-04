# Dice

## Naming conventions

| Term                 | Meaning                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| **notation**         | Raw dice string, e.g. `"2d6+3"`                                                   |
| **expression**       | Parsed form of a notation string (`DiceExpression`)                               |
| **term**             | One die group within an expression, e.g. the `2d6` in `2d6+1d8`                   |
| **Roll** (suffix)    | Result object returned by a roll function (`DiceRoll`, `TermRoll`, `DualityRoll`) |
| **Outcome** (suffix) | String classification of a roll result, not a result object (`DualityOutcome`)    |

## Class diagram

```mermaid
classDiagram
    class DiceTerm {
        +number count
        +number sides
    }

    class DiceExpression {
        +string notation
        +DiceTerm[] terms
        +number modifier
    }

    class TermRoll {
        +number sides
        +number[] results
    }

    class DiceRoll {
        +string notation
        +TermRoll[] rolls
        +number modifier
        +number total
    }

    class DualityRoll {
        +number hope
        +number fear
        +number total
        +DualityOutcome outcome
        +boolean isCritical
        +boolean withHope
        +boolean withFear
    }

    class DualityOutcome {
        <<enumeration>>
        critical
        hope
        fear
    }

    DiceExpression "1" *-- "1..*" DiceTerm : terms
    DiceRoll "1" *-- "1..*" TermRoll : rolls
    DualityRoll --> DualityOutcome : outcome

    note for DiceExpression "parseDice(notation) → DiceExpression"
    note for DiceRoll "rollDice(parsed, rollFn?) → DiceRoll"
    note for DualityRoll "rollDualityDice(rollFn?) → DualityRoll"
```
