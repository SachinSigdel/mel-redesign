import { expect, test } from "@playwright/test";

test("on phones, the Browse jobs bar appears once the hero buttons scroll away", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "phones only");
  await page.goto("/");

  const bar = page.getByRole("navigation", { name: "Quick actions" });
  await expect(bar).toBeHidden(); // the hero's own buttons are on screen

  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(bar).toBeVisible();
  await expect(bar.getByRole("link", { name: "Browse jobs" })).toHaveAttribute("href", "https://mymel.co.uk/job-board/");
  await expect(bar.getByRole("link", { name: "Call MEL on 020 8064 0994" })).toHaveAttribute("href", "tel:+442080640994");

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).toBeHidden();
});

test("on desktop, the bar is never shown", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop only");
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(page.getByRole("navigation", { name: "Quick actions" })).toBeHidden();
});

test("every heading sweeps in from alternating sides and ends fully visible", async ({ page }) => {
  await page.goto("/");
  const headings = page.locator("[data-heading]");
  const count = await headings.count();
  expect(count).toBeGreaterThanOrEqual(7);
  // headings waiting to come in from the right sit 24px to the right: that must never make the page scroll sideways
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  for (let i = 0; i < count; i++) {
    const heading = headings.nth(i);
    // 1st, 3rd, 5th… from the left (no attribute), the others from the right
    if (i % 2) await expect(heading).toHaveAttribute("data-heading-from", "right");
    else await expect(heading).not.toHaveAttribute("data-heading-from");

    await heading.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await expect(heading).toHaveClass(/is-revealed/);
    // once the sweep has finished, no mask is left on the text (nothing clipped) and nothing is still running
    await expect
      .poll(() => heading.evaluate((el) => `${getComputedStyle(el).getPropertyValue("mask-image")}|${el.getAnimations().length}`))
      .toBe("none|0");
  }
});

test("with reduce motion on, nothing is hidden or animated", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/js-reveal/); // the reveal CSS never switches on
  await expect(page.getByRole("heading", { name: "Recent posts" })).toBeVisible();
});
