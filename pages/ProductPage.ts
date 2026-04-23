import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly productName;
  readonly productDescription;
  readonly productPrice;
  readonly productImage;
  readonly addToCartButton;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('h1, [data-test="product-name"]').first();
    this.productDescription = page.locator(
      '[data-test="product-description"], .product-description, .card-text, p'
    );
    this.productPrice = page.locator('[data-test="unit-price"], .price').first();
    this.productImage = page.locator('img').first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  async expectProductDetailsVisible() {
    await expect(this.page).toHaveURL(/product/);
    await expect(this.productImage).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}