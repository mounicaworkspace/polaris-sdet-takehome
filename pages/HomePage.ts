import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly productCards;
  readonly searchInput;
  readonly noResultsMessage;
  readonly clearFiltersButton;
  readonly cartLink;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator(
      '[data-test="product-card"], .card, a[href*="/product/"]'
    );
    this.searchInput = page.locator(
      '[data-test="search-query"], input[type="search"], input[placeholder*="Search"]'
    );
    this.noResultsMessage = page.getByText(
      /no results found|there are no products found/i
    );
    this.clearFiltersButton = page.getByRole('button', { name: /clear/i });
    this.cartLink = page.locator('[data-test="nav-cart"]');
  }

  async open() {
    await this.goto('/');
  }

  async expectProductsVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async openFirstProduct() {
    await this.page
      .locator('a[href*="/product/"], a[href*="/product-details/"]')
      .first()
      .click();
  }

  async openProductByName(name: string) {
    await this.page.getByRole('link', { name: new RegExp(name, 'i') }).first().click();
  }

  async filterByCategory(category: string) {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    await this.goto(`/category/${slug}`);
  }

  async clearFilters() {
    if (await this.clearFiltersButton.count()) {
      const first = this.clearFiltersButton.first();
      if (await first.isVisible()) {
        await first.click();
        return;
      }
    }

    await this.goto('/');
  }

  async openCart() {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/checkout/);
  }
}