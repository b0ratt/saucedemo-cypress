import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';
import { credentials } from '../support/credentials';

describe('Authentication', () => {
	const loginPage = new LoginPage();
	const inventoryPage = new InventoryPage();

	beforeEach(() => {
		loginPage.visit();
	});

	it('Verify login page content', () => {
		loginPage
			.assertLoginPageHeader()
			.assertAuthenticationForm()
			.assertTestingCredentials();
	});

	it('Should attempt to login with standard user', () => {
		loginPage
			.fillUsernameInput(credentials.username[0])
			.fillPasswordInput(credentials.password)
			.clickLoginButton()
			.assertErrorMessage(false);

		inventoryPage.assertInventoryContainerVisible();
	});

	it('Should attempt to login with locked user', () => {
		loginPage
			.fillUsernameInput(credentials.username[1])
			.fillPasswordInput(credentials.password)
			.clickLoginButton()
			.assertErrorMessage(true);
	});

	it('Should attempt to login with problem user', () => {
		loginPage
			.fillUsernameInput(credentials.username[2])
			.fillPasswordInput(credentials.password)
			.clickLoginButton()
			.assertErrorMessage(false);

		inventoryPage.assertInventoryContainerVisible();
	});

	it('Should attempt to login with performance glitch user', () => {
		loginPage
			.fillUsernameInput(credentials.username[3])
			.fillPasswordInput(credentials.password)
			.clickLoginButton()
			.assertErrorMessage(false);

		inventoryPage.assertInventoryContainerVisible();
	});
});
