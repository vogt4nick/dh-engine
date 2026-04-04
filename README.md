# dh-engine

A Daggerheart system engine running entirely in the browser.

## Tech Stack

- **TypeScript** -- primary language
- **Vite** -- build tool and dev server
- **React** -- UI framework
- **Tailwind CSS** -- utility-first styling
- **Zustand** -- state management
- **Vitest** -- unit and integration tests
- **Playwright** -- end-to-end browser tests
- **ESLint** -- code quality linting
- **Prettier** -- code formatting
- **Husky** -- git hooks (lint-staged on pre-commit)

```text
dh-engine/
├── daggerheart-srd/     # Daggerheart Source Reference Document
├── docs/                # Repository documentation
├── public/              # Static assets
├── src/
│   ├── components/      # React UI components
│   ├── engine/          # Pure game logic (no UI, no framework deps)
│   │   └── index.ts     # Public engine API
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand slices (bridges engine → UI)
│   ├── types/           # Shared TypeScript types/interfaces
│   └── main.tsx         # Entry point
└── tests/
    ├── e2e/             # Playwright tests
    └── unit/            # Vitest unit tests (engine logic)
```

## Land the Plane

Run `scripts/land-the-plane.sh` and correct any failures before pushing code
changes.
