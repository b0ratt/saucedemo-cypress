import { Footer } from '../page-objects/Footer';
import { Header } from '../page-objects/Header';
import { InventoryPage } from '../page-objects/InventoryPage';
import { credentials } from '../support/credentials';

describe('Inventory tests', () => {
	const inventoryPage = new InventoryPage();
	const header = new Header();
	const footer = new Footer();

	context('Standard user', () => {
		const username = credentials.username[0];

		beforeEach('Login and navigate to inventory page', () => {
			cy.setCookie('session-username', username);
			inventoryPage.visit();
		});

		it('Should verify inventory content', () => {
			header
				.assertInventoryHeader()
				.assertMenuButton()
				.assertCartButton()
				.assertSortContainer()
				.assertSortingOptions();

			inventoryPage
				.assertInventoryContainerVisible()
				.assertInventoryItemsVisible()
				.assertInventoryItemsContent();

			footer
				.assertFooterVisible()
				.assertSocialMediaLogo()
				.assertCopyrightsText();
		});
	});

	context('Problem user', () => {
		const username = credentials.username[2];

		beforeEach('Login and navigate to inventory page', () => {
			cy.setCookie('session-username', username);
			inventoryPage.visit();
		});

		it('Should verify inventory content', () => {
			header
				.assertInventoryHeader()
				.assertMenuButton()
				.assertCartButton()
				.assertSortContainer()
				.assertSortingOptions();

			inventoryPage
				.assertInventoryContainerVisible()
				.assertInventoryItemsVisible()
				.assertInventoryItemsContent();

			footer
				.assertFooterVisible()
				.assertSocialMediaLogo()
				.assertCopyrightsText();
		});
	});
});
