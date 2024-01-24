import Chainable = Cypress.Chainable;

export class CheckoutPage {
  URL = 'checkout-step-one.html';

  clickContinueBtn(): this {
    this.getContinueBtn().should('be.visible').click();

    return this;
  }

  clickFinishBtn(): this {
    this.getFinishBtn().should('be.visible').click();

    return this;
  }

  fillFirstName(firstName: string): this {
    this.getFirstNameInput().type(firstName);

    return this;
  }

  fillLastName(lastName: string): this {
    this.getLastNameInput().type(lastName);

    return this;
  }

  fillZipCode(zipCode: string): this {
    this.getZipCodeInput().type(zipCode);

    return this;
  }

  assertValidationMessage(message: string): this {
    this.getErrorMessage().should('be.visible').and('contain', message);

    return this;
  }

  assertValidationMessageNotExist(): this {
    this.getErrorMessage().should('not.exist');

    return this;
  }

  assertCheckoutTotalPrice(totalPrice: number): this {
    const tax = totalPrice * 0.08;
    const total = parseFloat(tax.toFixed(2)) + totalPrice;

    this.getSubtotalPrice().should('contain', totalPrice);
    this.getTaxLabel().should('contain', tax.toFixed(2));
    this.getTotalPrice().should('contain', total);

    return this;
  }

  assertCheckoutCompleted(): this {
    this.getCompleteCheckoutHeader()
      .should('be.visible')
      .and('contain', 'Thank you for your order!');
    this.getCompleteCheckoutInfo()
      .should('be.visible')
      .and(
        'contain',
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
      );
    this.getBackToProductsBtn()
      .should('be.visible')
      .and('contain', 'Back Home');

    return this;
  }

  assertCheckoutProduct(productName: string, amount: number = 1): this {
    this.getCheckoutItem()
      .contains(productName)
      .parents('[data-cy="cart_item"]')
      .within(() => {
        this.getCheckoutQuantity().should('contain', amount);
        this.getCheckoutItemName().should('contain', productName);
      });

    return this;
  }

  assertCheckoutProductDescription(
    productName: string,
    description: string,
  ): this {
    this.getCheckoutItem()
      .contains(productName)
      .parents('[data-cy="cart_item"]')
      .within(() => {
        this.getCheckoutItemDescription().should('contain', description);
      });

    return this;
  }

  assertCheckoutProductPrice(productName: string, price: string): this {
    this.getCheckoutItem()
      .contains(productName)
      .parents('[data-cy="cart_item"]')
      .within(() => {
        this.getCheckoutItemPrice().should('contain', price);
      });

    return this;
  }

  assertCheckoutSecondStep(): this {
    cy.url().should('include', '/checkout-step-two.html');

    return this;
  }

  assertOrderSummaryVisible(): this {
    const summaryElements = {
      paymentLabel: '.summary_info_label:contains(Payment Information)',
      paymentCard: '.summary_value_label:contains(SauceCard)',
      shippingLabel: '.summary_info_label:contains(Shipping Information)',
      shippingType: '.summary_value_label:contains(Delivery)',
      priceLabel: '.summary_info_label:contains(Price Total)',
      priceSubtotal: '.summary_subtotal_label',
      priceTax: '.summary_tax_label',
      priceTotal: '.summary_total_label',
    };

    cy.get('.summary_info').within(() => {
      Object.values(summaryElements).forEach((selector) => {
        cy.get(selector).should('be.visible');
      });
    });

    return this;
  }

  assertAddressFormVisible(): this {
    this.assertFirstNameInput();
    this.assertLastNameInput();
    this.assertZipCodeInput();

    return this;
  }

  assertFirstNameInput(): this {
    cy.get('.checkout_info #first-name').should('be.visible');

    return this;
  }

  assertLastNameInput(): this {
    cy.get('.checkout_info #last-name').should('be.visible');

    return this;
  }

  assertZipCodeInput(): this {
    cy.get('.checkout_info #postal-code').should('be.visible');

    return this;
  }

  private getContinueBtn(): Chainable {
    return cy.dataCy('continue_btn');
  }

  private getFinishBtn(): Chainable {
    return cy.dataCy('finish_btn');
  }

  private getFirstNameInput(): Chainable {
    return cy.dataCy('first_name');
  }

  private getLastNameInput(): Chainable {
    return cy.dataCy('last_name');
  }

  private getZipCodeInput(): Chainable {
    return cy.dataCy('zip_code');
  }

  private getErrorMessage(): Chainable {
    return cy.dataCy('error_message');
  }

  private getSubtotalPrice(): Chainable {
    return cy.dataCy('subtotal_price');
  }

  private getTaxLabel(): Chainable {
    return cy.dataCy('tax_label');
  }

  private getTotalPrice(): Chainable {
    return cy.dataCy('total_price');
  }

  private getCompleteCheckoutHeader(): Chainable {
    return cy.dataCy('complete_header');
  }

  private getCompleteCheckoutInfo(): Chainable {
    return cy.dataCy('complete_text');
  }

  private getBackToProductsBtn(): Chainable {
    return cy.dataCy('back_to_products_btn');
  }

  private getCheckoutItem(): Chainable {
    return cy.dataCy('cart_item');
  }

  private getCheckoutQuantity(): Chainable {
    return cy.dataCy('cart_quantity');
  }

  private getCheckoutItemName(): Chainable {
    return cy.dataCy('item_title_link');
  }

  private getCheckoutItemDescription(): Chainable {
    return cy.dataCy('item_description');
  }

  private getCheckoutItemPrice(): Chainable {
    return cy.dataCy('item_price');
  }
}
