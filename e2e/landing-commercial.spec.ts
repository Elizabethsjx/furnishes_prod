import { test, expect } from "@playwright/test";

test("previous commercial homepage has direct navigation without a WebGL loader", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/?experience=commercial");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Furniture, considered.",
  );
  await expect(
    page.getByRole("link", { name: "Discuss your project" }),
  ).toHaveAttribute("href", "/contact");
  await expect(page.locator("[data-cozy-ready=true]")).toBeVisible();
  await page.getByRole("link", { name: "How it works" }).click();
  await expect(page).toHaveURL(/#approach$/);
  expect(errors).toEqual([]);
});

test("anonymous case has delivery status, loaded assets and a planning example", async ({
  page,
}) => {
  await page.goto("/?experience=commercial");
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
  await page.goto("/?experience=commercial");
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
    "A home that",
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

test("explainer supports step selection, prices and playback controls", async ({
  page,
}) => {
  await page.goto("/?experience=commercial");
  await page.getByRole("button", { name: "Pause explanation" }).click();
  await page.getByRole("button", { name: "02 Furniture list" }).click();
  await expect(page.getByTestId("workflow-scene")).toHaveAttribute(
    "data-step",
    "2",
  );
  await expect(page.getByTestId("workflow-scene")).toContainText("S$683");
  await expect(page.getByTestId("workflow-scene")).toContainText("S$156");
  await page.getByRole("button", { name: "03 2D → 3D" }).click();
  await expect(page.getByTestId("workflow-scene").locator("img")).toHaveCount(
    2,
  );
  await page.getByRole("button", { name: "04 Furniture in space" }).click();
  await expect(page.getByTestId("workflow-scene")).toContainText(
    "Model furniture is illustrative",
  );
  await page.getByRole("button", { name: "Play explanation" }).click();
  await expect(
    page.getByRole("button", { name: "Pause explanation" }),
  ).toBeVisible();
  await expect(page.getByTestId("workflow-scene")).toHaveAttribute(
    "data-step",
    "1",
    { timeout: 10000 },
  );
});

test("reduced motion keeps the explainer paused until requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?experience=commercial");
  await expect(
    page.getByRole("button", { name: "Play explanation" }),
  ).toBeVisible();
  await expect(page.locator('[data-reduced-motion="true"]')).toBeVisible();
  await page.getByRole("button", { name: "04 Furniture in space" }).click();
  await expect(page.getByTestId("workflow-scene")).toHaveAttribute(
    "data-step",
    "4",
  );
});

test("cozy room renders and supports colour choice and pausing", async ({
  page,
}) => {
  await page.goto("/?experience=commercial");
  await expect(page.locator('[data-cozy-ready="true"] canvas')).toBeVisible();
  await page.getByRole("button", { name: "Sage sofa colour" }).click();
  await expect(
    page.getByRole("button", { name: "Sage sofa colour" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Pause room motion" }).click();
  await expect(
    page.getByRole("button", { name: "Play room motion" }),
  ).toBeVisible();
});

test("cozy room has a static fallback without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/?experience=commercial");
  await expect(
    page.getByText("Your next space, imagined with care."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discuss your project" }),
  ).toBeVisible();
});

test("sample shortlist filters, compares and exports reference prices", async ({
  page,
}) => {
  await page.goto("/?experience=commercial");
  await page
    .getByRole("button", { name: "Add Individual study desk", exact: true })
    .click();
  await page.getByRole("button", { name: "Dining", exact: true }).click();
  await page
    .getByRole("button", { name: "Add Dining table & six chairs", exact: true })
    .click();
  const summary = page.getByRole("complementary", { name: "Sample shortlist" });
  await expect(summary).toContainText("2 selections");
  await expect(summary).toContainText("839");
  await page
    .getByRole("button", { name: "Compare selections", exact: true })
    .click();
  await expect(page.getByRole("table")).toContainText("Individual study desk");
  await expect(page.getByRole("table")).toContainText(
    "Dining table & six chairs",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export shortlist" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("furnishes-sample-shortlist.txt");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  if (stream) for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const content = Buffer.concat(chunks).toString("utf8");
  expect(content).toContain("not an order");
  expect(content.split("\n").length).toBeGreaterThan(5);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page
    .getByRole("button", { name: "Add Gas-lift storage bed", exact: true })
    .click();
  await expect(summary).toContainText("3 selections");
  await expect(summary).toContainText("839");
  await page
    .getByRole("button", { name: "Remove Individual study desk from summary" })
    .click();
  await expect(summary).toContainText("683");
});

test("project FAQ reveals scope details", async ({ page }) => {
  await page.goto("/?experience=commercial");
  await page
    .getByText("Are the displayed furniture prices final?", { exact: true })
    .click();
  await expect(
    page.getByText("No. The sample selections show prices recorded", {
      exact: false,
    }),
  ).toBeVisible();
});
