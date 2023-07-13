export class InventoryPage {
	URL = '/inventory.html';

	visit(): this {
		cy.visit(this.URL);
		return this;
	}

	assertInventoryItemsVisible(): this {
		cy.get('.inventory_item').each((item) => {
			expect(item).to.be.visible;
		});
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
}
