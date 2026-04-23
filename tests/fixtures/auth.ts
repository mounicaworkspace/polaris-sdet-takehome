import { Page } from '@playwright/test';
import { env } from '../../utils/env';
import { LoginPage } from '../../pages/LoginPage';

export async function loginViaUI(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(env.userEmail, env.userPassword);
}