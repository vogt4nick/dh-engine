import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173/dh-engine/",
    trace: "on-first-retry",
  },
  projects: [
    /* Test against desktop browsers */
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    /* Test against mobile viewports. */
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12 landscape"] } },
  ],
  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:5173/dh-engine/",
    reuseExistingServer: !process.env.CI,
  },
});
