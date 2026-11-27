import { expect, test } from "@playwright/test";

test("mobile menu opens, traps focus and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const openButton = page.getByRole("button", { name: "Open menu" });
  await openButton.click();

  const drawer = page.getByRole("navigation", { name: "Mobile" });
  await expect(drawer).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  // the page behind the drawer can't be reached while it's open
  await expect(page.locator("main")).toHaveJSProperty("inert", true);

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(page.locator("main")).toHaveJSProperty("inert", false);
  await expect(openButton).toBeFocused();
});

test("footer link takes you to the contact page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("contentinfo").getByRole("link", { name: "Contact us" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1, name: "Contact us" })).toBeVisible();
});
