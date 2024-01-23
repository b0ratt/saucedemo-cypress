import Chainable = Cypress.Chainable;
export class InventoryPage {
  URL = '/inventory.html';

  visit(): this {
    cy.visit(this.URL);
    return this;
  }

  addProductToCart(productName: string): this {
    this.getInventoryItem()
      .contains(productName)
      .within(() => {
        this.getAddToCartBtn().should('be.visible').click();
      });

    return this;
  }

  clickAddToCart(index: number = 0): this {
    this.getInventoryItem()
      .eq(index)
      .find('[data-cy="add_to_cart"]')
      .should('be.visible')
      .click();

    return this;
  }

  clickRemove(index: number = 0): this {
    this.getInventoryItem()
      .eq(index)
      .find('[data-cy="remove"]')
      .should('be.visible')
      .click();

    return this;
  }

  assertInventoryItemsVisible(): this {
    this.getInventoryItem().each((item) => {
      expect(item).to.be.visible;
    });

    return this;
  }

  assertRemoveBtnByName(productName: string): this {
    this.getInventoryItem()
      .contains(productName)
      .within(() => {
        this.getRemoveBtn().should('contain', 'Remove').and('be.visible');
      });

    return this;
  }

  assertRemoveFromCartBtn(index: number = 0): this {
    this.getInventoryItem()
      .eq(index)
      .find('[data-cy="remove"]')
      .should('be.visible')
      .and('have.text', 'Remove');

    return this;
  }

  assertInventoryItemsContent(): this {
    this.getInventoryItem().each((item) => {
      let selectors = {
        image: item.find('[data-cy="inventory_item_image"]'),
        itemHeader: item.find('[data-cy="inventory_item_name"]'),
        itemDescription: item.find('[data-cy="inventory_item_description"]'),
        itemPrice: item.find('[data-cy="inventory_item_price"]'),
        addToCarBtn: item.find('[data-cy="add_to_cart"]'),
      };

      expect(selectors.itemHeader).to.have.attr('href');
      expect(selectors.itemHeader).to.not.have.text('');
      expect(selectors.itemDescription).to.not.have.text('');
      expect(selectors.itemPrice).to.not.have.text('');
      expect(selectors.addToCarBtn).to.be.visible;
      expect(selectors.addToCarBtn).to.have.text('Add to cart');
      expect(selectors.image).to.have.attr('src').and.not.contain('404');
    });

    return this;
  }

  assertInventoryContainerVisible(): this {
    this.getInventoryContainer().should('be.visible');

    return this;
  }

  getProductByName(productName: string): Chainable<JQuery> {
    return this.getInventoryItem().contains(productName);
  }

  private getInventoryItem(): Chainable {
    return cy.dataCy('inventory_item');
  }

  private getAddToCartBtn(): Chainable {
    return cy.dataCy('add_to_cart');
  }

  private getRemoveBtn(): Chainable {
    return cy.dataCy('remove');
  }

  private getInventoryContainer(): Chainable {
    return cy.dataCy('inventory_container');
  }
}
