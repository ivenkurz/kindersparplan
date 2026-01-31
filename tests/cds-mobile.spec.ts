/**
 * CDS-Integration Test: Mobile-View
 * Prüft ob bg-ds-yellow-10 (#fff9eb) als Hintergrund lädt
 *
 * Ausführen: npx playwright test tests/cds-mobile.spec.ts
 * (Playwright muss installiert sein: npm install -D @playwright/test)
 */

import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 375, height: 667 }; // iPhone SE
const DS_YELLOW_10 = "rgb(255, 249, 235)"; // #fff9eb

test.describe("CDS Integration – Mobile View", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test("SparplanRechner: bg-ds-yellow-10 lädt als Hintergrund", async ({
    page,
    baseURL,
  }) => {
    const url = baseURL || "http://localhost:3000";
    await page.goto(`${url}/SparplanRechner`);

    const main = page.locator("main").first();
    await expect(main).toBeVisible();

    const bgColor = await main.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });

    expect(bgColor).toBe(DS_YELLOW_10);
  });

  test("Startseite: body hat bg-ds-yellow-10", async ({ page, baseURL }) => {
    const url = baseURL || "http://localhost:3000";
    await page.goto(url);

    const body = page.locator("body");
    const bgColor = await body.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });

    expect(bgColor).toBe(DS_YELLOW_10);
  });
});
