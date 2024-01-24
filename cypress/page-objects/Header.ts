import { BasePage } from './BasePage';
import Chainable = Cypress.Chainable;

export class Header extends BasePage {
  clickCartBtn(): this {
    this.getCartBtn().should('be.visible').click();

    return this;
  }

  sortInventoryItems(option: string): this {
    this.getProductSortBtn().select(option);

    return this;
  }

  assertInventoryHeader(): this {
    this.getAppLogo().should('have.text', 'Swag Labs');

    return this;
  }

  assertMenuButton(): this {
    this.getBurgerBtn().should('be.visible');

    return this;
  }

  assertCartButton(): this {
    this.getCartBtn().should('be.visible');

    return this;
  }

  assertCartIndicator(value: number | null): this {
    value === null
      ? this.getCartBadge().should('not.exist')
      : this.getCartBadge().should('be.visible').and('have.text', value);

    return this;
  }

  assertSortContainer(): this {
    this.getProductSortBtn().should('be.visible');

    return this;
  }

  assertSortingOptions(): this {
    // here we should click on button and put assertion on extended
    // list but because of app limitation I'll just search through DOM
    const sortingOptions = {
      nameAZ: 'az',
      nameZA: 'za',
      priceLowHigh: 'lohi',
      priceHighLow: 'hilo',
    };

    Object.values(sortingOptions).forEach((option) => {
      this.getSortingContainer()
        .children(`option[value="${option}"]`)
        .should('exist');
    });

    return this;
  }

  private getCartBtn(): Chainable {
    return cy.dataCy('cart_button');
  }

  private getProductSortBtn(): Chainable {
    return cy.dataCy('sort_container');
  }

  private getAppLogo(): Chainable {
    return cy.dataCy('app_logo');
  }

  private getBurgerBtn(): Chainable {
    return cy.dataCy('burger_btn');
  }

  private getCartBadge(): Chainable {
    return cy.dataCy('cart_badge');
  }

  private getSortingContainer(): Chainable {
    return cy.dataCy('sort_container');
  }
}
