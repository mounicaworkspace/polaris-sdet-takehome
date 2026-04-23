import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartContent;
  readonly quantityInputs;
  readonly removeButtons;
  readonly checkoutButton;

  constructor(page: Page) {
    super(page);

    this.cartContent = page.locator(
      'table, [data-test="cart-list"], .container, .row'
    );

    this.quantityInputs = page.locator(
      'input[type="number"], input[id*="quantity"], input[name*="quantity"]'
    );

    this.removeButtons = page.locator(
      'button[aria-label*="remove" i], button[aria-label*="delete" i], [data-test*="remove"], [data-test*="delete"], button.btn-danger'
    );

    this.checkoutButton = page.locator(
      'button:has-text("Proceed to checkout"), button:has-text("Checkout"), a:has-text("Checkout")'
    );
  }

  async expectCartPageVisible() {
    await expect(this.page).toHaveURL(/cart|checkout/i);
    await expect(this.page.locator('body')).toContainText(/cart|checkout/i);
  }

  async updateFirstItemQuantity(quantity: string) {
    await expect(this.quantityInputs.first()).toBeVisible();
    await this.quantityInputs.first().fill(quantity);
    await this.quantityInputs.first().press('Tab');
  }

  async removeFirstItem() {
    if (await this.removeButtons.count()) {
      const firstRemove = this.removeButtons.first();
      if (await firstRemove.isVisible()) {
        await firstRemove.click();
        return;
      }
    }

    await expect(this.quantityInputs.first()).toBeVisible();
    await this.quantityInputs.first().fill('0');
    await this.quantityInputs.first().press('Tab');
  }

  async goToCheckout() {
    await this.checkoutButton.first().click();
  }
}