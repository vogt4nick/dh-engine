# Writing Mockups

Mockups are self-contained HTML files that render a high-fidelity UI preview of
a component or feature. They live in `docs/mockups/` alongside a PNG screenshot.

## When to write a mockup

Write a mockup before building a new component or feature when:

- The layout or visual design is non-obvious
- You want AI feedback on look-and-feel before writing React code
- You need a reference image to test against during implementation

## File conventions

```text
docs/mockups/
├── mockup-<feature>.html   # self-contained mockup source
└── mockup-<feature>.png    # screenshot rendered from the HTML
```

Name files after the feature, not the component: `mockup-duality-dice`, not
`mockup-DualityDiceRoller`.

## Anatomy of a mockup file

Each mockup is a single `.html` file that requires no build step:

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Feature Name — Mockup</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            /* mirror tokens from src/styles/tokens.css */
          },
        },
      };
    </script>
  </head>
  <body class="bg-[#0f1117] text-white p-8">
    <!-- mockup content -->
  </body>
</html>
```

## Generating the PNG

Use Playwright to render the HTML file and capture a screenshot:

```bash
pnpm exec playwright screenshot \
  --full-page \
  --browser chromium \
  "docs/mockups/mockup-<feature>.html" \
  "docs/mockups/mockup-<feature>.png"
```

Commit both the `.html` and the `.png` together.

The HTML mockup does not need to be kept in sync with the React component after
implementation — it serves as a design artifact, not living documentation.
