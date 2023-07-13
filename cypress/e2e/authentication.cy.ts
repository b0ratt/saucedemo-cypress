import { InventoryPage } from '../page-objects/InventoryPage';
import { LoginPage } from '../page-objects/LoginPage';
import { credentials } from '../support/credentials';

describe('Authentication', () => {
	const loginPage = new LoginPage();
	const inventoryPage = new InventoryPage();
	const password = credentials.password;
	let username: string;

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
		username = credentials.username[0];

		loginPage
			.fillUsernameInput(username)
			.fillPasswordInput(password)
			.clickLoginButton()
			.assertErrorMessageNotExist()
			.assertCookieAfterLogin(username);

		inventoryPage.assertInventoryContainerVisible();
	});

	it('Should attempt to login with locked user', () => {
		username = credentials.username[1];

		loginPage
			.fillUsernameInput(username)
			.fillPasswordInput(password)
			.clickLoginButton()
			.assertErrorMessageNotExist()
			.assertCookieAfterLogin(username);
	});

	it('Should attempt to login with problem user', () => {
		username = credentials.username[2];

		loginPage
			.fillUsernameInput(username)
			.fillPasswordInput(password)
			.clickLoginButton()
			.assertErrorMessageNotExist()
			.assertCookieAfterLogin(username);

		inventoryPage.assertInventoryContainerVisible();
	});

	it('Should attempt to login with performance glitch user', () => {
		username = credentials.username[3];

		loginPage
			.fillUsernameInput(username)
			.fillPasswordInput(password)
			.clickLoginButton()
			.assertErrorMessageNotExist()
			.assertCookieAfterLogin(username);

		inventoryPage.assertInventoryContainerVisible();
	});
});
