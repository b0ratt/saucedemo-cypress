export class InventoryPage {
	URL = '/inventory.html';

	visit(): this {
		cy.visit(this.URL);
		return this;
	}

	assertInventoryItemsVisible(): this {
		cy.get('.inventory_item').each((item) => {
			expect(item).to.be.visible;
			expect(item.find('img')).to.have.attr('src').and.not.contain('404');
		});
		return this;
	}

	assertInventoryContainerVisible(): this {
		cy.get('#inventory_container').should('be.visible');
		return this;
	}
}
