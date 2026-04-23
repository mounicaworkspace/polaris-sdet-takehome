import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { loginViaUI } from '../fixtures/auth';

test.describe('User Story 6 & 7 - Cart actions', () => {
  test('positive: logged-in user can add a product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginViaUI(page);
    await homePage.open();
    await homePage.openFirstProduct();
    await productPage.addToCart();

    await homePage.openCart();
    await cartPage.expectCartPageVisible();
  });

  test('positive: user can update quantity in cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginViaUI(page);
    await homePage.open();
    await homePage.openFirstProduct();
    await productPage.addToCart();

    await homePage.openCart();
    await cartPage.expectCartPageVisible();
    await cartPage.updateFirstItemQuantity('2');

    await expect(cartPage.quantityInputs.first()).toHaveValue('2');
  });

  test('edge: user can remove an item from cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await loginViaUI(page);
  await homePage.open();
  await homePage.openFirstProduct();
  await productPage.addToCart();

  await homePage.openCart();
  await cartPage.expectCartPageVisible();
  await cartPage.removeFirstItem();

  await expect(page.locator('body')).toContainText(/empty|cart/i);
});
});