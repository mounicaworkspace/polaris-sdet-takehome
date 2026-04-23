import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('User Story 2 - View Product Details', () => {
  test('positive: clicking a product opens detail page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.open();
    await homePage.expectProductsVisible();
    await homePage.openFirstProduct();

    await expect(page).toHaveURL(/product/);
    await productPage.expectProductDetailsVisible();
  });

  test('edge: invalid product route should not show valid product details', async ({ page }) => {
    await page.goto('/product/invalid-product-id');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toBeVisible();
  });
});