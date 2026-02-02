/**
 * Kindersparplan – UI-Tests
 * Sparziele-Auswahl, monatlich berechnet; Edge-Cases; Responsivität; Tooltips, Undo
 *
 * Ausführen: npx playwright test tests/kindersparplan.spec.ts
 * (Dev-Server muss laufen: npm run dev)
 */

import { test, expect } from "@playwright/test";

test.describe("Kindersparplan", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const url = baseURL || "http://localhost:3000";
    await page.goto(`${url}/Kindersparplan`);
  });

  test("Szenario 1: Kind 5, Ziel 18, Sparziel Studium → monatlich berechnet", async ({
    page,
  }) => {
    // Default: Studium 30.000€, Laufzeit 13 Jahre → monatlich wird berechnet
    const sparplanText = page.locator("text=Deine monatliche Sparsumme");
    await expect(sparplanText).toBeVisible({ timeout: 5000 });
    await expect(page.locator("text=/\\d+\\s*€\\s*\\/\\s*Monat/")).toBeVisible();
  });

  test("Szenario 2: Kind 0 Jahre, Ziel 18 → 18 Jahre Laufzeit", async ({ page }) => {
    const kindSlider = page.locator('input[type="range"]').first();
    await kindSlider.fill("0");

    const laufzeitText = page.locator("text=Laufzeit:");
    await expect(laufzeitText).toContainText("18 Jahre");
  });

  test("Szenario 3: Sparziel Führerschein → niedrigerer monatlicher Betrag", async ({
    page,
  }) => {
    const fuehrerscheinBtn = page.locator('button:has-text("Führerschein")');
    await fuehrerscheinBtn.click();
    await expect(page.locator("text=/2\\.?500/")).toBeVisible();
    await expect(page.locator("text=/\\d+\\s*€\\s*\\/\\s*Monat/")).toBeVisible();
  });

  test("Szenario 4: Zielalter 30 Jahre → lange Laufzeit", async ({ page }) => {
    const zielSlider = page.locator('input[type="range"]').nth(1);
    await zielSlider.fill("30");

    const laufzeitText = page.locator("text=Laufzeit:");
    await expect(laufzeitText).toContainText("25 Jahre");
  });

  test("Szenario 5: Sparziel Studium → Progress-Bar sichtbar", async ({
    page,
  }) => {
    const studiumBtn = page.locator('button:has-text("Studium")');
    await studiumBtn.click();

    const progressLabel = page.locator("text=Fortschritt");
    await expect(progressLabel).toBeVisible();
    await expect(page.locator("text=Ziel:")).toBeVisible();
  });

  test("Responsivität: Mobile Viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("h1")).toContainText("Kindersparplan");
    await expect(page.locator("main")).toBeVisible();
  });

  test("Tooltip: Klick auf ? öffnet Hinweis", async ({ page }) => {
    const tooltipBtn = page.locator('button:has-text("?")').first();
    await tooltipBtn.click();
    await expect(page.locator("text=Zinseszins")).toBeVisible({ timeout: 3000 });
  });

  test("Undo: Nach Änderung erscheint Zurücksetzen", async ({ page }) => {
    const kindSlider = page.locator('input[type="range"]').first();
    await kindSlider.fill("3");
    const undoBtn = page.locator("text=Zurücksetzen");
    await expect(undoBtn).toBeVisible({ timeout: 2000 });
  });
});
