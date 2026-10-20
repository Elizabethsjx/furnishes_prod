import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "../e2e",
  testMatch: ["landing-heritage.spec.ts", "landing-commercial.spec.ts"],
  workers: 1,
  timeout: 30000,
  reporter: "list",
  outputDir: "../test-results/corporate",
  use: {
    baseURL: process.env.CORPORATE_PREVIEW_URL || "http://127.0.0.1:3026",
    contextOptions: { reducedMotion: "reduce" },
    launchOptions: {
      executablePath:
        process.env.CHROME_PATH ||
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--disable-gpu"],
    },
  },
});
