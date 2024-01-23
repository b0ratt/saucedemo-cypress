export class CartPage {
  URL = 'cart.html';

  clickCheckoutBtn(): this {
    cy.get('#checkout').should('be.visible').click();

    return this;
  }

  assertCartContainsProduct(productName: string, amount: number = 1): this {
    cy.get(`.cart_item:contains(${productName})`).within(() => {
      cy.get('.cart_quantity').should('contain', amount);
      cy.get('.cart_item_label > [id^="item_"]').should('contain', productName);
    });

    return this;
  }

  assertCartProductDescription(productName: string, description: string): this {
    cy.get(`.cart_item:contains(${productName})`).within(() => {
      cy.get('.inventory_item_desc').should('contain', description);
    });

    return this;
  }

  assertCartProductPrice(productName: string, price: string): this {
    cy.get(`.cart_item:contains(${productName})`).within(() => {
      cy.get('.inventory_item_price').should('contain', price);
    });

    return this;
  }
}
