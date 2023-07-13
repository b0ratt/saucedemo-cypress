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
		cy.get('[id^="add-to-cart-sauce-labs-"]').click();
		return this;
	}

	clickRemove(): this {
		cy.get('[id^="remove-sauce-labs-"]').should('be.visible').click();
		return this;
	}

	assertBackToInventoryBtn(): this {
		cy.get('#back-to-products')
			.should('be.visible')
			.and('have.text', 'Back to products');
		return this;
	}

	assertAddToCartBtn(): this {
		cy.get('#add-to-cart-sauce-labs-bike-light')
			.should('be.visible')
			.and('have.text', 'Add to cart');
		return this;
	}

	assertRemoveBtn(): this {
		cy.get('[id^="remove-sauce-labs-"]')
			.should('be.visible')
			.and('have.text', 'Remove');
		return this;
	}
}
