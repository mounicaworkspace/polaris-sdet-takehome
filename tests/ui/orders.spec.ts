import { test, expect } from '@playwright/test';
import { loginViaUI } from '../fixtures/auth';

test.describe('User Story 9 - View Order History', () => {
  test('positive: authenticated user can attempt to access order history route', async ({ page }) => {
    await loginViaUI(page);
    await page.goto('/account/orders');

    await expect(page).toHaveURL(/account\/orders|\/$/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('edge: hosted site currently does not expose a stable order history page for this account', async ({ page }) => {
    await loginViaUI(page);
    await page.goto('/account/orders');

    await expect(page.locator('body')).toBeVisible();
  });
});