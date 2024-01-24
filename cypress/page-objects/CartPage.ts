import Chainable = Cypress.Chainable;

export class CartPage {
  URL = 'cart.html';

  clickCheckoutBtn(): this {
    this.getCheckoutBtn().should('be.visible').click();

    return this;
  }

  assertCartContainsProduct(productName: string, amount: number = 1): this {
    this.getCartItem()
      .contains(productName)
      .parents('[data-cy="cart_item"]')
      .within(() => {
        this.getCartQuantity().should('contain', amount);
        this.getCartItemName().should('contain', productName);
      });

    return this;
  }

  assertCartProductDescription(productName: string, description: string): this {
    this.getCartItem()
      .contains(productName)
      .parents('[data-cy="cart_item"]')
      .within(() => {
        this.getCartItemDescription().should('contain', description);
      });

    return this;
  }

  assertCartProductPrice(productName: string, price: string): this {
    this.getCartItem()
      .contains(productName)
      .parents('[data-cy="cart_item"]')
      .within(() => {
        this.getCartItemPrice().should('contain', price);
      });

    return this;
  }

  private getCartItem(): Chainable {
    return cy.dataCy('cart_item');
  }

  private getCartQuantity(): Chainable {
    return cy.dataCy('cart_quantity');
  }

  private getCartItemName(): Chainable {
    return cy.dataCy('item_title_link');
  }

  private getCartItemDescription(): Chainable {
    return cy.dataCy('item_description');
  }

  private getCartItemPrice(): Chainable {
    return cy.dataCy('item_price');
  }

  private getCheckoutBtn(): Chainable {
    return cy.dataCy('checkout_btn');
  }
}
