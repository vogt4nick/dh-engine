import { expect, test } from "@playwright/test";

test.describe("/credits", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("credits");
  });

  test("displays the required DPCGL attribution statement", async ({
    page,
  }) => {
    await expect(
      page.getByText(
        "This product includes materials from the Daggerheart System Reference Document 1.0",
      ),
    ).toBeVisible();
    await expect(page.getByText("© Critical Role, LLC.")).toBeVisible();
    await expect(
      page.getByText("Darrington Press Community Gaming (DPCGL) License"),
    ).toBeVisible();
  });

  test("links to daggerheart.com", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "daggerheart.com" }),
    ).toHaveAttribute("href", "https://www.daggerheart.com/");
  });

  test("acknowledges SRD modifications by seansbox", async ({ page }) => {
    await expect(
      page.getByText("minor modifications to format and structure"),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "seansbox/daggerheart-srd" }),
    ).toBeVisible();
  });

  test("displays copyright notice for Nick Vogt", async ({ page }) => {
    await expect(
      page.getByText("Application source code © Nick Vogt"),
    ).toBeVisible();
  });

  test("is linked from the home page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Credits" }).click();
    await expect(page).toHaveURL("credits");
  });
});

test.describe("footer", () => {
  for (const [label, path] of [
    ["/", "/"],
    ["/credits", "credits"],
    ["/ActionRoller", "ActionRoller"],
    ["/DualityDiceRoller", "DualityDiceRoller"],
  ]) {
    test(`displays copyright footer on ${label}`, async ({ page }) => {
      await page.goto(path);
      await expect(
        page.locator("footer").getByText("Nick Vogt", { exact: false }),
      ).toBeVisible();
    });
  }
});
