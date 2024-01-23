import Chainable = Cypress.Chainable;

export class Footer {
  assertFooterVisible(): this {
    cy.get('footer').should('be.visible');
    return this;
  }

  assertSocialMediaLogo(): this {
    const social = {
      facebook: {
        selector: 'facebook',
        url: 'https://www.facebook.com/saucelabs',
      },
      twitter: {
        selector: 'twitter',
        url: 'https://twitter.com/saucelabs',
      },
      linkedIn: {
        selector: 'linkedin',
        url: 'https://www.linkedin.com/company/sauce-labs/',
      },
    };

    Object.values(social).forEach((platform) => {
      cy.dataCy('platform')
        .should('be.visible')
        .find('a')
        .should('have.attr', 'href', platform.url);
    });

    return this;
  }

  assertCopyrightsText(): this {
    this.getFooterCopyrights().should(
      'have.text',
      '© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy',
    );

    return this;
  }

  private getFooterCopyrights(): Chainable {
    return cy.dataCy('copyrights');
  }
}
