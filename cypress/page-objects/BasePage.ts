export class BasePage {
	checkCartItemsInStorage(empty: boolean): this {
		cy.getAllLocalStorage().then(() => {
			empty !== false
				? expect(localStorage.getItem('cart-contents')).to.exist
				: expect(localStorage.getItem('cart-contents')).to.have.string('[]');
		});
		return this;
	}
}
