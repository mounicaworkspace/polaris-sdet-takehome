import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

type ShippingData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
};

type PaymentData = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
};

export class CheckoutPage extends BasePage {
  readonly proceed1Button;
  readonly proceed2Button;
  readonly proceed3Button;
  readonly finishButton;

  readonly continueAsGuestTab;
  readonly guestEmail;
  readonly guestFirstName;
  readonly guestLastName;
  readonly guestSubmit;

  constructor(page: Page) {
    super(page);

    this.proceed1Button = page.locator('[data-test="proceed-1"]');
    this.proceed2Button = page.locator('[data-test="proceed-2"]');
    this.proceed3Button = page.locator('[data-test="proceed-3"]');
    this.finishButton = page.locator('[data-test="finish"]');

    this.continueAsGuestTab = page.locator('a[href="#guest-tab"]').first();
    this.guestEmail = page.locator('[data-test="guest-email"], #guest-email').first();
    this.guestFirstName = page.locator('[data-test="guest-first-name"], #guest-first-name').first();
    this.guestLastName = page.locator('[data-test="guest-last-name"], #guest-last-name').first();
    this.guestSubmit = page.locator('[data-test="guest-submit"], input[value="Continue as Guest"]').first();
  }

  async continueFromCart() {
    await expect(this.proceed1Button).toBeVisible();
    await this.proceed1Button.click();
  }

  async continueAsGuest(email: string, firstName: string, lastName: string) {
    if (await this.continueAsGuestTab.count()) {
      if (await this.continueAsGuestTab.isVisible()) {
        await this.continueAsGuestTab.click();
      }
    }

    await expect(this.guestEmail).toBeVisible();
    await this.guestEmail.fill(email);
    await this.guestFirstName.fill(firstName);
    await this.guestLastName.fill(lastName);
    await this.guestSubmit.click();
  }

  async continueFromSignInStepIfPresent() {
    if (await this.proceed2Button.count()) {
      const btn = this.proceed2Button.first();
      if (await btn.isVisible()) {
        await btn.click();
      }
    }
  }

  async continueFromBillingStepIfPresent() {
    if (await this.proceed3Button.count()) {
      const btn = this.proceed3Button.first();
      if (await btn.isVisible()) {
        await btn.click();
      }
    }
  }

  async fillBillingAddress(shipping: ShippingData) {
    const firstName = this.page.locator('input[name="first_name"], input[id="first_name"]').first();
    const lastName = this.page.locator('input[name="last_name"], input[id="last_name"]').first();
    const address = this.page.locator('input[name="address"], input[id="address"]').first();
    const city = this.page.locator('input[name="city"], input[id="city"]').first();
    const state = this.page.locator('input[name="state"], input[id="state"]').first();
    const country = this.page.locator('input[name="country"], input[id="country"]').first();
    const postcode = this.page.locator('input[name="postcode"], input[id="postcode"]').first();

    await expect(firstName).toBeVisible();
    await firstName.fill(shipping.firstName);
    await lastName.fill(shipping.lastName);
    await address.fill(shipping.address);
    await city.fill(shipping.city);
    await state.fill(shipping.state);
    await country.fill(shipping.country);
    await postcode.fill(shipping.postcode);
  }

  async fillPaymentDetails(payment: PaymentData) {
    const creditCardRadio = this.page.locator('input[value="credit-card"]').first();
    if (await creditCardRadio.count()) {
      await creditCardRadio.check({ force: true });
    }

    const cardNumber = this.page.locator(
      'input[name="credit_card_number"], input[id="credit_card_number"]'
    ).first();

    const expiryDate = this.page.locator(
      'input[name="expiration_date"], input[id="expiration_date"]'
    ).first();

    const cvv = this.page.locator(
      'input[name="cvv"], input[id="cvv"]'
    ).first();

    const cardHolder = this.page.locator(
      'input[name="card_holder_name"], input[id="card_holder_name"]'
    ).first();

    await expect(cardNumber).toBeVisible();
    await cardNumber.fill(payment.cardNumber);
    await expiryDate.fill(payment.expiryDate);
    await cvv.fill(payment.cvv);
    await cardHolder.fill(payment.cardHolder);
  }

  async placeOrder() {
    await expect(this.finishButton).toBeEnabled();
    await this.finishButton.click();
  }

  async expectOrderConfirmation() {
    await expect(this.page.locator('body')).toContainText(
      /thank you|order confirmation|success|payment was successful|order placed/i
    );
  }

  async expectFinishButtonDisabled() {
    await expect(this.finishButton).toBeDisabled();
  }
}