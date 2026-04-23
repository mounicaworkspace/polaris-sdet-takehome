import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { env } from '../../utils/env';

test.describe('User Story 5 - Login', () => {
  test('positive: valid credentials allow successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.expectLoginPageVisible();
    await loginPage.login(env.userEmail, env.userPassword);

    await page.goto('/account');

    await expect(page).toHaveURL(/account/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('negative: invalid credentials show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(env.invalidEmail, env.invalidPassword);
    await loginPage.expectLoginError();
  });
});