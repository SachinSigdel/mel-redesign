import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows errors and focuses the first invalid field when submitted empty", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Please enter your first name")).toBeVisible();
    await expect(page.getByText("Please enter your email address")).toBeVisible();
    await expect(page.getByText("Please tell us who you are")).toBeVisible();
    await expect(page.getByText("Please enter a message")).toBeVisible();

    const firstName = page.getByLabel("First name");
    await expect(firstName).toBeFocused();
    await expect(firstName).toHaveAttribute("aria-invalid", "true");
  });

  test("rejects an invalid UK phone number", async ({ page }) => {
    await page.getByLabel("Phone").fill("0123");
    await page.getByLabel("Phone").blur();
    await expect(page.getByText("Please enter a valid UK phone number")).toBeVisible();
  });

  test("submits valid test data and shows a success message", async ({ page }) => {
    await page.getByLabel("First name").fill("Jane");
    await page.getByLabel("Email").fill("jane.test@example.com");
    await page.getByLabel("I am a").selectOption("candidate");
    await page.getByLabel("Your message").fill("I am looking for warehouse work in Uxbridge.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toContainText("Thanks Jane, your message has been sent");
    await expect(page.getByLabel("First name")).toHaveValue("");
    // focus stays on the button; the live region announces the result
    await expect(page.getByRole("button", { name: "Send message" })).toBeFocused();
  });
});
