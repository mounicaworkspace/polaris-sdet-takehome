import { Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async clickLink(name: string | RegExp) {
    await this.page.getByRole('link', { name }).click();
  }

  async clickButton(name: string | RegExp) {
    await this.page.getByRole('button', { name }).click();
  }
}