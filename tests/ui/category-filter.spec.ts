import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { testData } from '../fixtures/test-data';

test.describe('User Story 4 - Filter Products by Category', () => {
  test('positive: selecting a category updates the product list', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCategory(testData.categoryName);

    await expect(page).toHaveURL(/category|hand-tools/i);
    await homePage.expectProductsVisible();
  });

  test('edge: clearing the filter restores the product list', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCategory(testData.categoryName);
    await homePage.clearFilters();

    await expect(page).not.toHaveURL(/hand-tools/i);
    await homePage.expectProductsVisible();
  });
});