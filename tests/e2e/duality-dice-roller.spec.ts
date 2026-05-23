import { expect, test } from "@playwright/test";

// Math.ceil(0.5 * 12) = 6; both dice identical → critical
const CRITICAL_RANDOM = 0.5;
// Math.ceil(0.9 * 12) = 11, Math.ceil(0.1 * 12) = 2 → hope > fear
const HOPE_RANDOM_SEQUENCE = [0.9, 0.1];
// Math.ceil(0.1 * 12) = 2, Math.ceil(0.9 * 12) = 11 → fear > hope
const FEAR_RANDOM_SEQUENCE = [0.1, 0.9];

test.describe("/DualityDiceRoller", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("#/DualityDiceRoller");
  });

  test("renders the Duality Dice heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Duality Dice" }),
    ).toBeVisible();
  });

  test("renders the Roll the Dice button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Roll the Dice" }),
    ).toBeVisible();
  });

  test("shows no results before rolling", async ({ page }) => {
    await expect(page.getByText("Total:")).not.toBeVisible();
    await expect(page.getByText("Roll History")).not.toBeVisible();
  });

  test("shows hope die, vs divider, and fear die after rolling", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Roll the Dice" }).click();

    await expect(page.getByTestId("die-hope")).toBeVisible();
    await expect(page.getByText("vs")).toBeVisible();
    await expect(page.getByTestId("die-fear")).toBeVisible();
  });

  test("hope and fear die labels are visible after rolling", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Roll the Dice" }).click();

    await expect(page.getByTestId("die-hope").getByText("Hope")).toBeVisible();
    await expect(page.getByTestId("die-fear").getByText("Fear")).toBeVisible();
  });

  test("shows numeric die values between 1 and 12 after rolling", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Roll the Dice" }).click();

    const hopeDiv = page.getByTestId("die-hope").locator("div");
    const fearDiv = page.getByTestId("die-fear").locator("div");

    await expect(hopeDiv).toBeVisible();
    await expect(fearDiv).toBeVisible();

    const hopeValue = Number(await hopeDiv.textContent());
    const fearValue = Number(await fearDiv.textContent());

    expect(hopeValue).toBeGreaterThanOrEqual(1);
    expect(hopeValue).toBeLessThanOrEqual(12);
    expect(fearValue).toBeGreaterThanOrEqual(1);
    expect(fearValue).toBeLessThanOrEqual(12);
  });

  test("total equals hope plus fear", async ({ page }) => {
    await page.getByRole("button", { name: "Roll the Dice" }).click();

    const hopeValue = Number(
      await page.getByTestId("die-hope").locator("div").textContent(),
    );
    const fearValue = Number(
      await page.getByTestId("die-fear").locator("div").textContent(),
    );
    const totalText = await page
      .getByText("Total:")
      .locator("span")
      .textContent();

    expect(Number(totalText)).toBe(hopeValue + fearValue);
  });

  test("shows outcome label With Hope when hope die is higher", async ({
    page,
  }) => {
    await page.evaluate((seq) => {
      let index = 0;
      Math.random = () => seq[index++ % seq.length];
    }, HOPE_RANDOM_SEQUENCE);

    await page.getByRole("button", { name: "Roll the Dice" }).click();

    await expect(page.getByText("With Hope").first()).toBeVisible();
  });

  test("shows outcome label With Fear when fear die is higher", async ({
    page,
  }) => {
    await page.evaluate((seq) => {
      let index = 0;
      Math.random = () => seq[index++ % seq.length];
    }, FEAR_RANDOM_SEQUENCE);

    await page.getByRole("button", { name: "Roll the Dice" }).click();

    await expect(page.getByText("With Fear").first()).toBeVisible();
  });

  test("shows Critical Success when hope and fear dice are equal", async ({
    page,
  }) => {
    await page.evaluate((r) => {
      Math.random = () => r;
    }, CRITICAL_RANDOM);

    await page.getByRole("button", { name: "Roll the Dice" }).click();

    await expect(page.getByText("Critical Success!").first()).toBeVisible();
  });

  test("shows roll history table with correct columns after rolling", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Roll the Dice" }).click();

    await expect(page.getByRole("columnheader", { name: "#" })).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Hope" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Fear" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Total" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Outcome" }),
    ).toBeVisible();
  });

  test("history row values match the result card", async ({ page }) => {
    await page.getByRole("button", { name: "Roll the Dice" }).click();

    const hopeValue = await page
      .getByTestId("die-hope")
      .locator("div")
      .textContent();
    const fearValue = await page
      .getByTestId("die-fear")
      .locator("div")
      .textContent();

    const row = page.locator("tbody tr").first();
    await expect(row.locator("td").nth(1)).toHaveText(hopeValue ?? "");
    await expect(row.locator("td").nth(2)).toHaveText(fearValue ?? "");
  });

  test("each roll appends a row to history", async ({ page }) => {
    const button = page.getByRole("button", { name: "Roll the Dice" });

    await button.click();
    await expect(page.locator("tbody tr")).toHaveCount(1);

    await button.click();
    await expect(page.locator("tbody tr")).toHaveCount(2);

    await button.click();
    await expect(page.locator("tbody tr")).toHaveCount(3);
  });

  test("history rows are numbered in reverse order", async ({ page }) => {
    const button = page.getByRole("button", { name: "Roll the Dice" });

    await button.click();
    await button.click();

    const firstCell = page.locator("tbody tr").first().locator("td").first();
    await expect(firstCell).toHaveText("2");

    const lastCell = page.locator("tbody tr").last().locator("td").first();
    await expect(lastCell).toHaveText("1");
  });

  test("history outcome badge shows Critical! for critical rolls", async ({
    page,
  }) => {
    await page.evaluate((r) => {
      Math.random = () => r;
    }, CRITICAL_RANDOM);

    await page.getByRole("button", { name: "Roll the Dice" }).click();

    const badge = page.locator("tbody tr").first().locator("td").last();
    await expect(badge.getByText("Critical!")).toBeVisible();
  });
});

test("home page links to /DualityDiceRoller", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Roll Duality Dice" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Roll Duality Dice" }).click();
  await expect(page).toHaveURL(/.+#\/DualityDiceRoller$/);
  await expect(
    page.getByRole("heading", { name: "Duality Dice" }),
  ).toBeVisible();
});
