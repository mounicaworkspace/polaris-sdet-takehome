import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { testData } from '../fixtures/test-data';

test.describe('User Story 3 - Search for a Product', () => {
  test('positive: entering a valid product name shows matching results', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.searchFor(testData.productSearchTerm);

    await expect(page.locator('body')).toContainText(new RegExp(testData.productSearchTerm, 'i'));
  });

  test('negative: non-matching search returns no matching products', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.searchFor(testData.nonExistingProduct);

    await expect(page.locator('body')).not.toContainText(/combination pliers|bolt cutters|screwdriver|hammer/i);
  });
});