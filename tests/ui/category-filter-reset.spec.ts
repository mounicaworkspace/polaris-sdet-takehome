import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { testData } from '../fixtures/test-data';

test.describe('User Story 10 - Category Filtering and Reset', () => {
  test('positive: selected category persists after refresh', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCategory(testData.categoryName);

    await expect(page).toHaveURL(/category|hand-tools/i);
    await page.reload();

    await expect(page).toHaveURL(/category|hand-tools/i);
    await homePage.expectProductsVisible();
  });

  test('edge: clear filters restores the full list', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCategory(testData.categoryName);
    await homePage.clearFilters();

    await expect(page).not.toHaveURL(/hand-tools/i);
    await homePage.expectProductsVisible();
  });
});