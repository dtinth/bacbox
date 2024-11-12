import { expect, test } from "@playwright/test";

test("it can be completed", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const checkbox = page.locator('input[type="checkbox"]:not(:checked)').first();
  while (await checkbox.isVisible()) {
    await checkbox.check();
  }
  await expect(page.getByText("You win!")).toBeVisible();
  await expect(page.getByText("Your code:")).toBeVisible();
});
