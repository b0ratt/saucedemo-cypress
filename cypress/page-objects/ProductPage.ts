import Chainable = Cypress.Chainable;

export class ProductPage {
  URL = '/inventory-item.html';

  constructor(productId: number = 0) {
    this.URL += `/?id=${productId}`;
  }

  visitProductPage(): this {
    cy.visit(this.URL);
    return this;
  }

  clickAddToCart(): this {
    this.getAddToCartBtn().click();

    return this;
  }

  clickRemove(): this {
    this.getRemoveFromCartBtn().should('be.visible').click();

    return this;
  }

  assertBackToInventoryBtn(): this {
    this.getBackToProductsBtn()
      .should('be.visible')
      .and('have.text', 'Back to products');

    return this;
  }

  assertRemoveBtn(): this {
    this.getRemoveFromCartBtn().should('be.visible').and('have.text', 'Remove');

    return this;
  }

  private getAddToCartBtn(): Chainable {
    return cy.dataCy('add_to_cart');
  }

  private getRemoveFromCartBtn(): Chainable {
    return cy.dataCy('remove');
  }

  private getBackToProductsBtn(): Chainable {
    return cy.dataCy('back_to_products');
  }
}
