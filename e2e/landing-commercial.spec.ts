import { test, expect } from "@playwright/test";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test("legacy commercial entry leads to the dedicated business page", async ({
  page,
}) => {
  await page.goto("/?experience=commercial");
  await expect(page).toHaveURL(/\/commercial$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "your business works.",
  );
  await page.getByRole("link", { name: "Meet our supply partner" }).click();
  await expect(page).toHaveURL(/\/partners\/huagui$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tongxiang Huagui",
  );
});

test("collection enquiry keeps product context and explains email delivery", async ({
  page,
}) => {
  await page.goto("/collections");
  await page
    .getByRole("link", { name: "Request images & specifications" })
    .first()
    .click();
  await expect(page.locator('[name="type"]')).toHaveValue("commercial");
  await expect(page.locator('[name="requirements"]')).toContainText(
    "趣系列 / Qu",
  );
  await expect(
    page.getByText("Your enquiry is sent only when you send that email.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Prepare project email" }),
  ).toBeVisible();
});

test("case distinguishes delivered planning from pending furniture", async ({
  page,
}) => {
  await page.goto("/projects/bto-family");
  await expect(
    page.getByText(
      "Shortlist & planning proposal delivered. Furniture has not yet arrived.",
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Furniture delivery and installation are not complete."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore the 3D example" }),
  ).toHaveAttribute("href", "/examples/family-apartment.html");
});
