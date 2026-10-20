import { test, expect } from "@playwright/test";

test.setTimeout(90000);
test.use({ contextOptions: { reducedMotion: "reduce" } });

test("corporate home explains the process and exposes business branches", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your space.",
  );
  await expect(page.getByTestId("landing-hero")).toHaveAttribute(
    "data-renderer-state",
    /webgl|fallback/,
    { timeout: 30000 },
  );
  await expect(page.locator("[data-assembly-intro]")).toHaveCount(0);
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
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("summary").focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Services" })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await page.getByRole("link", { name: "Furnishes home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 20000 });
  await expect(page.locator("#furnishes-route-handoff-cover")).toHaveAttribute(
    "data-route-handoff",
    "off",
  );
});

test("static home fits phone, tablet, desktop and 4K", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  for (const width of [320, 390, 768, 1024, 1440, 1920, 3840]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
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

test("workspace entry retains the intended destination through login", async ({
  page,
}) => {
  await page.goto("/workspace", { waitUntil: "domcontentloaded" });
  const entry = page.getByRole("link", { name: "Enter your 3D workspace" });
  await expect(entry).toHaveAttribute(
    "href",
    "/login?next=%2Faccount%2Fcanvas",
  );
  await entry.click();
  await expect(page).toHaveURL(/\/login\?next=%2Faccount%2Fcanvas$/, {
    timeout: 20000,
  });
});

test("the house remains usable with reduced motion", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.getByTestId("landing-hero");
  await expect(hero).toHaveAttribute("data-renderer-state", "webgl", {
    timeout: 30000,
  });
  await expect(hero).toHaveAttribute("data-paused", "true");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(hero).toHaveAttribute("data-render-width", "390");
  const room = hero.locator('button[data-room-visible="true"]').first();
  await expect(room).toBeVisible();
  const name = await room.getAttribute("data-room");
  await room.click();
  await expect(hero).toHaveAttribute("data-active-room", name!);
  await hero.getByRole("button", { name: "Overview", exact: true }).click();
  await expect(hero).toHaveAttribute("data-active-room", "overview");
  await expect(hero).toHaveAttribute("data-paused", "true");
});

test("WebGL unavailable still leaves a useful home and enquiry path", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (
        type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
      )
        return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("landing-hero")).toHaveAttribute(
    "data-renderer-state",
    "fallback",
    { timeout: 30000 },
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your space.",
  );
  await expect(
    page.getByRole("link", { name: "Discuss your project", exact: false }),
  ).toBeVisible();
});
