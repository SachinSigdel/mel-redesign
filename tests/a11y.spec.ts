import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/* Automated WCAG 2.1 A and AA checks with axe on both pages, on desktop and on a phone.
   axe catches about a third of accessibility problems (contrast, names, labels, landmarks…);
   the rest was checked by hand (see the accessibility review in the design notes). */
for (const path of ["/", "/contact"]) {
  test(`${path} has no WCAG 2.1 AA violations found by axe`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" }); // nothing half-faded while colours are measured
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .options({ iframes: false }) // the Google Maps embed is Google's page, not ours
      .analyze();

    // list each problem as "rule: element" so a failure says exactly what to fix
    const problems = results.violations.flatMap((v) => v.nodes.map((n) => `${v.id}: ${n.target.join(" ")}`));
    expect(problems).toEqual([]);
  });
}
