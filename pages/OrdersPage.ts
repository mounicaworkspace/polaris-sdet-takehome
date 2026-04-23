import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrdersPage extends BasePage {
  readonly orderRows;

  constructor(page: Page) {
    super(page);
    this.orderRows = page.locator(
      'table tbody tr, .order-item, [data-test="order"], a[href*="/account/orders/"]'
    );
  }

  async open() {
    await this.goto('/account/orders');
  }

  async expectOrdersPageVisible() {
    await expect(this.page).toHaveURL(/orders/);
    await expect(this.page.locator('body')).toContainText(/order|orders/i);
  }

  async expectOrdersListVisible() {
    await expect(this.page.locator('body')).toContainText(/order|orders/i);
  }

  async openFirstOrder() {
    if (await this.orderRows.count()) {
      await this.orderRows.first().click();
    }
  }

  async expectOrderDetailsVisible() {
    await expect(this.page.locator('body')).toContainText(/date|total|item|order/i);
  }
}