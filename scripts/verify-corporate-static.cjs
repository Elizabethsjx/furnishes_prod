const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const assert = require("assert/strict");
const base = process.env.CORPORATE_PREVIEW_URL || "http://127.0.0.1:3026";
const out = path.resolve("docs/corporate-refresh/qa");
const routes = [
  "/",
  "/residential",
  "/commercial",
  "/space-planning",
  "/how-it-works",
  "/collections",
  "/projects",
  "/projects/bto-family",
  "/partners/huagui",
  "/contact",
];
const sizes = [
  [320, 740],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1440, 1000],
  [1920, 1080],
  [3840, 2160],
];
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--disable-gpu"],
  });
  const page = await browser.newPage({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const result = {
    mode: "static; prefers-reduced-motion: reduce; screenshots disable animations",
    checks: [],
    fonts: {},
    errors,
  };
  async function typography() {
    return page.evaluate(() => {
      const root = document.querySelector(
        "[data-corporate-root], [data-landing-root]",
      );
      const tally = {
        serif: { characters: 0, rectArea: 0, nodes: 0 },
        sans: { characters: 0, rectArea: 0, nodes: 0 },
        mono: { characters: 0, rectArea: 0, nodes: 0 },
      };
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const el = node.parentElement;
        if (
          !el ||
          el.closest('script,style,svg,[aria-hidden="true"]') ||
          !node.textContent.trim()
        )
          continue;
        const style = getComputedStyle(el);
        if (style.visibility === "hidden" || style.display === "none") continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = [...range.getClientRects()].filter(
          (r) => r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0,
        );
        if (!rects.length) continue;
        const family = style.fontFamily;
        const type = /Georgia|Times New Roman/.test(family)
          ? "serif"
          : /monospace|Space Mono/.test(family)
            ? "mono"
            : "sans";
        tally[type].characters += node.textContent.replace(/\s/g, "").length;
        tally[type].rectArea += rects.reduce(
          (sum, r) => sum + r.width * r.height,
          0,
        );
        tally[type].nodes++;
      }
      return {
        tally,
        bodyFont: getComputedStyle(root).fontFamily,
        headingFont: getComputedStyle(root.querySelector("h1")).fontFamily,
        fontsLoaded: document.fonts.status,
      };
    });
  }
  try {
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      for (const route of routes) {
        console.log(`Checking ${route} at ${width}`);
        const response = await page.goto(base + route, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        assert.equal(response.status(), 200, route);
        await page.locator("[data-corporate-root]").waitFor();
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all(
            [...document.images].map(async (image) => {
              image.loading = "eager";
              await image.decode();
            }),
          );
        });
        const state = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1: document.querySelectorAll("main h1").length,
          brokenImages: [...document.images]
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.src),
          animations: document
            .getAnimations()
            .filter((a) => a.playState === "running").length,
        }));
        assert.ok(
          state.scrollWidth <= width,
          `${route} at ${width}: overflow ${state.scrollWidth}`,
        );
        assert.equal(state.h1, 1, route);
        assert.deepEqual(state.brokenImages, [], route);
        assert.equal(state.animations, 0, route);
        result.checks.push({ route, width, height, ...state });
        if (route === "/" && [390, 768, 1440, 3840].includes(width)) {
          result.fonts[`new-${width}`] = await typography();
          await page.screenshot({
            path: path.join(out, `home-${width}.png`),
            fullPage: true,
            animations: "disabled",
          });
        }
        if (route === "/commercial" && width === 1440)
          await page.screenshot({
            path: path.join(out, "commercial-1440.png"),
            fullPage: true,
            animations: "disabled",
          });
      }
      console.log(`Passed ${routes.length} routes at ${width} × ${height}`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/");
    const menu = page.locator("summary").first();
    await menu.focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("details").first().getAttribute("open"),
      "",
    );
    await page
      .getByRole("navigation", { name: "Mobile navigation", exact: true })
      .getByRole("link", { name: "Business" })
      .click();
    await page.waitForURL("**/commercial");
    await page
      .getByRole("link", { name: "Furnishes home", exact: true })
      .click();
    await page.waitForURL(base + "/");
    await page.locator("[data-landing-root]").waitFor();
    await page.goto(base + "/contact?type=commercial&collection=Qu");
    assert.equal(await page.locator("[name=type]").inputValue(), "commercial");
    assert.match(await page.locator("[name=requirements]").inputValue(), /Qu/);
    assert.equal(
      await page.locator("form").evaluate((f) => f.checkValidity()),
      false,
    );
    await page.locator("[name=name]").fill("Preview QA");
    await page.locator("[name=email]").fill("qa@example.com");
    assert.equal(
      await page.locator("form").evaluate((f) => f.checkValidity()),
      true,
    );
    await page.goto(base + "/?experience=commercial");
    assert.equal(new URL(page.url()).pathname, "/commercial");
    await page.goto(base + "/?experience=original");
    assert.equal(new URL(page.url()).search, "");
    if (process.env.REVIEW_ORIGINAL === "1") {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(base + "/review-original", { waitUntil: "networkidle" });
      result.fonts["original-1440"] = await typography();
    }
    result.interactions =
      "mobile keyboard menu, branch navigation, return home, query prefill, form validation, legacy redirects passed; no email sent";
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      path.join(out, "static-checks.json"),
      JSON.stringify(result, null, 2),
    );
    console.log(
      JSON.stringify(
        {
          checks: result.checks.length,
          fonts: result.fonts,
          interactions: result.interactions,
          errors,
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
