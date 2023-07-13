export class Footer {
	assertFooterVisible(): this {
		cy.get('footer').should('be.visible');
		return this;
	}

	assertSocialMediaLogo(): this {
		const social = {
			facebook: {
				selector: '.social_facebook',
				url: 'https://www.facebook.com/saucelabs',
			},
			twitter: {
				selector: '.social_twitter',
				url: 'https://twitter.com/saucelabs',
			},
			linkedIn: {
				selector: '.social_linkedin',
				url: 'https://www.linkedin.com/company/sauce-labs/',
			},
		};

		Object.values(social).forEach((platform) => {
			cy.get(platform.selector)
				.should('be.visible')
				.find('a')
				.should('have.attr', 'href', platform.url);
		});

		return this;
	}

	assertCopyrightsText(): this {
		cy.get('.footer_copy').should(
			'have.text',
			'© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'
		);

		return this;
	}
}
