import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { Header } from '../../page-objects/Header';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { credentials } from '../../support/credentials';
import { setViewport, viewports } from '../../support/viewports';

describe('Order flow', () => {
  const inventoryPage = new InventoryPage();
  const header = new Header();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const username = credentials.username[0];
  const orderData = {
    firstName: 'FirstName',
    lastName: 'LastName',
    zipCode: '123456',
  };

  context('Desktop', () => {
    beforeEach('Login and navigate to inventory', () => {
      setViewport(viewports.medium);
      cy.setCookie('session-username', username);
      inventoryPage.visit();
    });

    afterEach('Clear cart', () => {
      cy.clearLocalStorage('cart-contents');
    });

    it('Order single product', () => {
      const productName = 'Sauce Labs Backpack';
      let productDescription: string, productPrice: string;

      inventoryPage
        .getProductByName(productName)
        .parents('.inventory_item')
        .within(() => {
          cy.get('.inventory_item_desc')
            .invoke('text')
            .as('productDescription');
          cy.get('.inventory_item_price').invoke('text').as('productPrice');
        });

      inventoryPage
        .addProductToCart(productName)
        .assertRemoveBtnByName(productName);

      cy.get('@productDescription')
        .then((_description) => {
          productDescription = _description.toString();

          return cy.get('@productPrice');
        })
        .then((_price) => {
          productPrice = _price.toString();

          const sanitizedPrice = productPrice.replace('$', '');

          header.assertCartIndicator(1).clickCartBtn();
          cartPage
            .assertCartContainsProduct(productName)
            .assertCartProductDescription(productName, productDescription)
            .assertCartProductPrice(productName, productPrice)
            .clickCheckoutBtn();
          checkoutPage
            .assertAddressFormVisible()
            .fillFirstName(orderData.firstName)
            .fillLastName(orderData.lastName)
            .fillZipCode(orderData.zipCode)
            .clickContinueBtn()
            .assertCheckoutProduct(productName)
            .assertCheckoutProductDescription(productName, productDescription)
            .assertCheckoutProductPrice(productName, productPrice)
            .assertOrderSummaryVisible()
            .assertCheckoutTotalPrice(parseFloat(sanitizedPrice))
            .clickFinishBtn()
            .assertCheckoutCompleted();
        });
    });

    it('Order few products', () => {
      const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
      let firstProductDescription: string, secondProductDescription: string;
      let firstProductPrice: string, secondProductPrice: string;
      let sanitizedPrice;

      products.forEach((item, index) => {
        inventoryPage.addProductToCart(item).assertRemoveBtnByName(item);
        inventoryPage
          .getProductByName(item)
          .parents('.inventory_item')
          .find('.inventory_item_desc')
          .invoke('text')
          .as(`productDescription-${index}`);
        inventoryPage
          .getProductByName(item)
          .parents('.inventory_item')
          .find('.inventory_item_price')
          .invoke('text')
          .as(`productPrice-${index}`);
      });

      cy.get('@productDescription-0')
        .then((_firstDescription) => {
          firstProductDescription = _firstDescription.toString();

          return cy.get('@productPrice-0');
        })
        .then((_firstPrice) => {
          firstProductPrice = _firstPrice.toString();

          return cy.get('@productDescription-1');
        })
        .then((_secondDescription) => {
          secondProductDescription = _secondDescription.toString();

          return cy.get('@productPrice-1');
        })
        .then((_secondPrice) => {
          secondProductPrice = _secondPrice.toString();
          sanitizedPrice =
            parseFloat(firstProductPrice.replace('$', '')) +
            parseFloat(secondProductPrice.replace('$', ''));

          header.assertCartIndicator(products.length).clickCartBtn();
          cartPage
            .assertCartContainsProduct(products[0])
            .assertCartProductDescription(products[0], firstProductDescription)
            .assertCartProductPrice(products[0], firstProductPrice)
            .assertCartContainsProduct(products[1])
            .assertCartProductDescription(products[1], secondProductDescription)
            .assertCartProductPrice(products[1], secondProductPrice)
            .clickCheckoutBtn();

          checkoutPage
            .assertAddressFormVisible()
            .fillFirstName(orderData.firstName)
            .fillLastName(orderData.lastName)
            .fillZipCode(orderData.zipCode)
            .clickContinueBtn()
            .assertCheckoutProduct(products[0])
            .assertCheckoutProductDescription(
              products[0],
              firstProductDescription,
            )
            .assertCheckoutProductPrice(products[0], firstProductPrice)
            .assertCheckoutProduct(products[1])
            .assertCheckoutProductDescription(
              products[1],
              secondProductDescription,
            )
            .assertCheckoutProductPrice(products[1], secondProductPrice)
            .assertOrderSummaryVisible()
            .assertCheckoutTotalPrice(sanitizedPrice);
        });
    });

    it('Checkout validation', () => {
      const productName = 'Sauce Labs Backpack';
      let productDescription: string, productPrice: string;

      inventoryPage
        .getProductByName(productName)
        .parents('.inventory_item')
        .within(() => {
          cy.get('.inventory_item_desc')
            .invoke('text')
            .as('productDescription');
          cy.get('.inventory_item_price').invoke('text').as('productPrice');
        });

      inventoryPage
        .addProductToCart(productName)
        .assertRemoveBtnByName(productName);

      cy.get('@productDescription').then((_description) => {
        productDescription = _description.toString();

        return cy
          .get('@productPrice')
          .then((_price) => {
            productPrice = _price.toString();
          })
          .then(() => {
            header.assertCartIndicator(1).clickCartBtn();
            cartPage
              .assertCartContainsProduct(productName)
              .assertCartProductDescription(productName, productDescription)
              .assertCartProductPrice(productName, productPrice)
              .clickCheckoutBtn();
            checkoutPage
              .assertAddressFormVisible()
              .clickContinueBtn()
              .assertValidationMessage('Error: First Name is required')
              .fillFirstName(orderData.firstName)
              .clickContinueBtn()
              .assertValidationMessage('Error: Last Name is required')
              .fillLastName(orderData.lastName)
              .clickContinueBtn()
              .assertValidationMessage('Error: Postal Code is required')
              .fillZipCode(orderData.zipCode)
              .clickContinueBtn()
              .assertValidationMessageNotExist();
          });
      });
    });
  });
});
