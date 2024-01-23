import { CartPage } from '../../page-objects/CartPage';
import { Header } from '../../page-objects/Header';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { ProductPage } from '../../page-objects/ProductPage';
import { credentials } from '../../support/credentials';

describe('Cart', () => {
  const inventoryPage = new InventoryPage();
  const header = new Header();
  const productPage = new ProductPage();
  const username = credentials.username[0];

  context('Desktop', () => {
    beforeEach('Set cookie and navigate to inventory', () => {
      cy.setCookie('session-username', username);
    });

    afterEach('Clear local storage', () => {
      cy.clearLocalStorage('cart-contents');
    });

    it('Add and delete item from invetory page and verify cart indicator', () => {
      inventoryPage.visit().clickAddToCart().assertRemoveFromCartBtn();
      header.assertCartIndicator(1).checkCartItemsInStorage(true);
      inventoryPage.clickRemove();
      header.assertCartIndicator(null).checkCartItemsInStorage(false);
    });

    it.only('Add and delete item from product page and verify cart indicator', () => {
      productPage.visitProductPage().clickAddToCart().assertRemoveBtn();
      header.assertCartIndicator(1).checkCartItemsInStorage(true);
      productPage.clickRemove();
      header.assertCartIndicator(null).checkCartItemsInStorage(false);
    });
  });
});
