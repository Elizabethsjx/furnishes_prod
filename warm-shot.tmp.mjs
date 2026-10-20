import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--disable-gpu"],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await page.waitForTimeout(2500);
await page.screenshot({ path: "/tmp/warm-hero-1440.png" });

await page.evaluate(() => window.scrollTo(0, 980));
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/warm-band-1440.png" });

await page.evaluate(() => {
  const el = [...document.querySelectorAll("span")].find((n) =>
    n.textContent?.includes("SINGAPORE"),
  );
  el?.scrollIntoView({ block: "center" });
});
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/warm-strip-1440.png" });

const strip = page
  .locator("text=Clear specifications.")
  .locator("xpath=..");
await strip.screenshot({ path: "/tmp/warm-strip-el.png" });

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/warm-bottom-1440.png" });

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
  isMobile: true,
  hasTouch: true,
});
const mp = await mobile.newPage();
await mp.goto("http://localhost:3000/", { waitUntil: "load" });
await mp.waitForTimeout(2500);
await mp.screenshot({ path: "/tmp/warm-hero-390.png" });

const introCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
const ip = await introCtx.newPage();
await ip.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
await ip.waitForTimeout(950);
await ip.screenshot({ path: "/tmp/warm-intro.png" });

await browser.close();
console.log("shots done");
