import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { loginViaUI } from '../fixtures/auth';
import { testData } from '../fixtures/test-data';

test.describe('User Story 8 - Complete Checkout', () => {
  /*
  test('positive: user can complete checkout with shipping and payment details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginViaUI(page);
    await homePage.open();
    await homePage.openFirstProduct();
    await productPage.addToCart();

    await homePage.openCart();
    await checkoutPage.continueFromCart();
    await checkoutPage.continueAsGuest(
      'guest-checkout@example.com',
      testData.shipping.firstName,
      testData.shipping.lastName
    );
    await checkoutPage.continueFromSignInStepIfPresent();
    await checkoutPage.fillBillingAddress(testData.shipping);
    await checkoutPage.continueFromBillingStepIfPresent();
    await checkoutPage.fillPaymentDetails(testData.payment);
    await checkoutPage.placeOrder();
    await checkoutPage.expectOrderConfirmation();
  });
  */

  test('negative: checkout cannot be completed when required details are missing', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginViaUI(page);
    await homePage.open();
    await homePage.openFirstProduct();
    await productPage.addToCart();

    await homePage.openCart();
    await checkoutPage.continueFromCart();
    await checkoutPage.continueFromSignInStepIfPresent();
    await checkoutPage.continueFromBillingStepIfPresent();

    await checkoutPage.expectFinishButtonDisabled();
  });
});