import { test, expect } from "@playwright/test";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test("corporate home explains the process and exposes business branches", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Considered furniture.",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#how-it-works li")).toHaveCount(4);
  for (const href of ["/residential", "/commercial", "/space-planning"]) {
    await expect(
      page.locator(`#business-areas a[href="${href}"]`),
    ).toBeVisible();
  }
  await expect(
    page.getByText("Proposal delivered · Furniture not yet received", {
      exact: true,
    }),
  ).toBeVisible();
});

test("mobile navigation is keyboard accessible and returns home", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("summary").focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Business" })
    .click();
  await expect(page).toHaveURL(/\/commercial$/);
  await page.getByRole("link", { name: "Furnishes home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#furnishes-route-handoff-cover")).toHaveAttribute(
    "data-route-handoff",
    "off",
  );
});

test("static home fits phone, tablet, desktop and 4K", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920, 3840]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator("[data-corporate-root]")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () =>
          document
            .querySelector("[data-corporate-root]")!
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    ).toBe(0);
  }
});
