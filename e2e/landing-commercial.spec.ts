import { test, expect } from "@playwright/test";

test("new homepage has direct navigation without a WebGL loader", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your space.",
  );
  await expect(
    page.getByRole("link", { name: "Tell us about your project" }),
  ).toHaveAttribute("href", "/contact");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "How it works" }).click();
  await expect(page).toHaveURL(/#approach$/);
  expect(errors).toEqual([]);
});

test("anonymous case has delivery status, loaded assets and a planning example", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View the case study" }).click();
  await expect(page).toHaveURL(/projects\/bto-family$/);
  await expect(
    page.getByText(
      "Shortlist & planning proposal delivered. Furniture has not yet arrived.",
    ),
  ).toBeVisible();
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await expect(page.locator("body")).not.toContainText("Yan Shiuan");
  await expect(
    page.getByRole("link", { name: "Explore the 3D example" }),
  ).toHaveAttribute("href", "/examples/family-apartment.html");
});

test("mobile home and case do not overflow and retain navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/projects/bto-family"]) {
    await page.goto(path);
    await expect(
      page.getByRole("link", { name: "Start a project", exact: false }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("return from login clears legacy freeze and transition overlays", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    sessionStorage.setItem("furnishes-landing-intro-seen", "1");
    sessionStorage.setItem(
      "furnishes-landing-freeze-v3",
      "data:image/png;base64,iVBORw0KGgo=",
    );
  });
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await expect(page).toHaveURL(/login$/);
  await page
    .getByRole("link", { name: /furnishes/i })
    .first()
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your space.",
  );
  await expect(page.locator("#furnishes-landing-freeze-style")).toHaveCount(0);
  await expect(page.locator('[data-route-handoff="on"]')).toHaveCount(0);
});

test("prepared planner opens and its room-view controls work", async ({
  page,
}) => {
  await page.goto("/examples/family-apartment.html");
  await expect(page.locator("canvas")).toBeVisible({ timeout: 30000 });
  await expect(page.locator("#loading-overlay")).toHaveCSS("opacity", "0", {
    timeout: 30000,
  });
  await expect(page.locator("#loading-overlay")).toHaveCSS(
    "pointer-events",
    "none",
  );
  await page.getByRole("button", { name: "Top", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Top", exact: true }),
  ).toHaveClass(/is-active/);
  await page.getByRole("button", { name: "Reference", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Reference render and source plan" }),
  ).toBeVisible();
});
