import { test, expect } from "@playwright/test";

test("editorial home preserves direct routes and a usable no-WebGL experience", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A home thatgrows with you.",
  );
  await expect(
    page.getByRole("link", { name: "Start a project" }),
  ).toHaveAttribute("href", "/contact");
  await expect(
    page.getByRole("link", { name: "Log in", exact: true }),
  ).toHaveAttribute("href", "/login");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "Furniture & modules" }).click();
  await expect(page).toHaveURL(/#modules$/);
  await page.screenshot({ path: "/tmp/furnishes-refresh/desktop-story.png" });
  expect(errors).toEqual([]);
});

test("furniture chapters respond to forward and backward scroll, including keyboard selection", async ({
  page,
}) => {
  await page.goto("/");
  const story = page.locator('[data-story="furniture"]');
  const svg = story.locator("svg");
  await story.scrollIntoViewIfNeeded();
  const before = await svg.innerHTML();
  const last = page.getByRole("button", { name: /Furniture chapter 4/ });
  await last.focus();
  await page.keyboard.press("Enter");
  await expect(last).toHaveAttribute("aria-current", "step");
  expect(await svg.innerHTML()).not.toEqual(before);
  await page.getByRole("button", { name: /Furniture chapter 1/ }).click();
  await expect(
    page.getByRole("button", { name: /Furniture chapter 1/ }),
  ).toHaveAttribute("aria-current", "step");
});

test("real case reveals the planning reference and retains the source and delivery status", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Case chapter 4/ }).click();
  await expect(
    page.getByRole("button", { name: /Case chapter 4/ }),
  ).toHaveAttribute("aria-current", "step");
  await expect(
    page.getByText("Furniture delivery and installation are not complete.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: "View the case study" }).click();
  await expect(page).toHaveURL(/projects\/bto-family$/);
  await expect(
    page.getByText(
      "Shortlist & planning proposal delivered. Furniture has not yet arrived.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore the 3D example" }),
  ).toHaveAttribute("href", "/examples/family-apartment.html");
});

test("mobile layouts retain content without horizontal overflow", async ({
  page,
}) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "Start a project" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `/tmp/furnishes-refresh/mobile-${width}.png`,
    });
    await page.getByRole("button", { name: /Furniture chapter 4/ }).click();
    await expect(
      page.getByRole("button", { name: /Furniture chapter 4/ }),
    ).toHaveAttribute("aria-current", "step");
    await page.screenshot({
      path: `/tmp/furnishes-refresh/mobile-story-${width}.png`,
    });
  }
});

test("reduced motion presents static complete illustrations and all story text", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const story = page.locator('[data-story="furniture"]');
  await expect(story).toHaveAttribute("data-reduced-motion", "true");
  const before = await story.locator("svg").innerHTML();
  await page.locator("#approach").scrollIntoViewIfNeeded();
  expect(await story.locator("svg").innerHTML()).toEqual(before);
  await expect(story.getByRole("button").first()).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "A clearer next step." }),
  ).toHaveCount(1);
});
