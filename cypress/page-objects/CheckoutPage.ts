export class CheckoutPage {
	URL = 'checkout-step-one.html';

	clickContinueBtn(): this {
		cy.get('#continue').should('be.visible').click();

		return this;
	}

	clickFinishBtn(): this {
		cy.get('#finish').should('be.visible').click();

		return this;
	}

	fillFirstName(firstName: string): this {
		cy.get('.checkout_info #first-name').type(firstName);

		return this;
	}

	fillLastName(lastName: string): this {
		cy.get('.checkout_info #last-name').type(lastName);

		return this;
	}

	fillZipCode(zipCode: string): this {
		cy.get('.checkout_info #postal-code').type(zipCode);

		return this;
	}

	assertValidationMessage(message: string): this {
		cy.get('.error-message-container')
			.should('be.visible')
			.and('contain', message);

		return this;
	}

	assertValidationMessageNotExist(): this {
		cy.get('.error-message-container').should('not.exist');

		return this;
	}

	assertCheckoutTotalPrice(totalPrice: number): this {
		console.log(totalPrice);

		const tax = totalPrice * 0.08;
		const total = parseFloat(tax.toFixed(2)) + totalPrice;

		cy.get('.summary_subtotal_label').should('contain', totalPrice);
		cy.get('.summary_tax_label').should('contain', tax.toFixed(2));
		cy.get('.summary_total_label').should('contain', total);

		return this;
	}

	assertCheckoutCompleted(): this {
		cy.get('#checkout_complete_container').within(() => {
			cy.get('.complete-header')
				.should('contain', 'Thank you for your order!')
				.and('be.visible');
			cy.get('.complete-text')
				.should(
					'contain',
					'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
				)
				.and('be.visible');
			cy.get('#back-to-products')
				.should('contain', 'Back Home')
				.and('be.visible');
		});

		return this;
	}

	assertCheckoutProduct(productName: string, amount: number = 1): this {
		cy.get(`.cart_item:contains(${productName})`).within(() => {
			cy.get('.cart_quantity').should('contain', amount);
			cy.get('.cart_item_label > [id^="item_"]').should('contain', productName);
		});

		return this;
	}

	assertCheckoutProductDescription(
		productName: string,
		description: string
	): this {
		cy.get(`.cart_item:contains(${productName})`).within(() => {
			cy.get('.inventory_item_desc').should('contain', description);
		});

		return this;
	}

	assertCheckoutProductPrice(productName: string, price: string): this {
		cy.get(`.cart_item:contains(${productName})`).within(() => {
			cy.get('.inventory_item_price').should('contain', price);
		});

		return this;
	}

	assertCheckoutSecondStep(): this {
		cy.url().should('include', '/checkout-step-two.html');

		return this;
	}

	assertOrderSummaryVisible(): this {
		const summaryElements = {
			paymentLabel: '.summary_info_label:contains(Payment Information)',
			paymentCard: '.summary_value_label:contains(SauceCard)',
			shippingLabel: '.summary_info_label:contains(Shipping Information)',
			shippingType: '.summary_value_label:contains(Delivery)',
			priceLabel: '.summary_info_label:contains(Price Total)',
			priceSubtotal: '.summary_subtotal_label',
			priceTax: '.summary_tax_label',
			priceTotal: '.summary_total_label',
		};

		cy.get('.summary_info').within(() => {
			Object.values(summaryElements).forEach((selector) => {
				cy.get(selector).should('be.visible');
			});
		});

		return this;
	}

	assertAddressFormVisible(): this {
		this.assertFirstNameInput();
		this.assertLastNameInput();
		this.assertZipCodeInput();

		return this;
	}

	assertFirstNameInput(): this {
		cy.get('.checkout_info #first-name').should('be.visible');

		return this;
	}

	assertLastNameInput(): this {
		cy.get('.checkout_info #last-name').should('be.visible');

		return this;
	}

	assertZipCodeInput(): this {
		cy.get('.checkout_info #postal-code').should('be.visible');

		return this;
	}
}
