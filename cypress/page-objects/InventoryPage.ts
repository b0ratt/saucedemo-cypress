import Chainable = Cypress.Chainable;
export class InventoryPage {
  URL = '/inventory.html';

  visit(): this {
    cy.visit(this.URL);
    return this;
  }

  addProductToCart(productName: string): this {
    console.log(productName);

    cy.get(`.inventory_item:contains(${productName})`).within(() => {
      cy.get('[id^="add-to-cart-"]').should('be.visible').click();
    });

    return this;
  }

  clickAddToCart(index: number = 0): this {
    cy.get('.inventory_item')
      .eq(index)
      .find('[id^="add-to-cart-sauce-labs-"]')
      .should('be.visible')
      .click();
    return this;
  }

  clickRemove(index: number = 0): this {
    cy.get('.inventory_item')
      .eq(index)
      .find('[id^="remove-sauce-labs-"]')
      .should('be.visible')
      .click();
    return this;
  }

  assertInventoryItemsVisible(): this {
    cy.get('.inventory_item').each((item) => {
      expect(item).to.be.visible;
    });
    return this;
  }

  assertRemoveBtnByName(productName: string): this {
    cy.get(`.inventory_item:contains(${productName})`).within(() => {
      cy.get('div').contains('Remove').should('be.visible');
    });

    return this;
  }

  assertRemoveFromCartBtn(index: number = 0): this {
    cy.get('.inventory_item')
      .eq(index)
      .find('#remove-sauce-labs-backpack')
      .should('be.visible')
      .and('have.text', 'Remove');
    return this;
  }

  assertInventoryItemsContent(): this {
    cy.get('.inventory_item').each((item) => {
      let selectors = {
        image: item.find('img'),
        itemHeader: item.find('[id$=_title_link]'),
        itemDescription: item.find('.inventory_item_desc'),
        itemPrice: item.find('.inventory_item_price'),
        addToCarBtn: item.find('.btn_inventory'),
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
    cy.get('#inventory_container').should('be.visible');
    return this;
  }

  getProductByName(productName: string): Chainable<JQuery> {
    return cy.get(`.inventory_item:contains(${productName})`);
  }
}
