import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('User Story 1 - View Product List', () => {
  test('positive: homepage displays available products', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.expectProductsVisible();
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('edge: pagination or scrolling still shows products correctly', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.expectProductsVisible();

    await page.mouse.wheel(0, 2500);
    await expect(homePage.productCards.first()).toBeVisible();
  });
});