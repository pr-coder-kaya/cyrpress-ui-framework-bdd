///<reference types="cypress"/>

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import SmartBearLoginPage from "../pages/SmartBearLoginPage";
import SmartBearOrdersPage from '../pages/SmartBearOrdersPage';

const smartBearLoginPage = new SmartBearLoginPage();
const smartBearOrdersPage = new SmartBearOrdersPage();

const order = {
	productInfo: {
		product: "FamilyAlbum",
		quantity: 2
	},
	addressInfo: {
		customerName: "John Doe",
		street: "123 St",
		city: "Chicago",
		state: "IL",
		ZIPCODE: "12345"
	},
	paymentInfo: {
		cardType: "Visa",
		cardNumber: "1234123412341234",
		expirationDate: "12/27"
	}
}

Given(/^user is on "([^"]*)"$/, (url) => {
	cy.visit(url)
});

When(/^user enters username as "([^"]*)"$/, (username) => {
	smartBearLoginPage.enterUsername(username)
});

When(/^user enters password as "([^"]*)"$/, (password) => {
	smartBearLoginPage.enterPassword(password)
});

When(/^user clicks on "([^"]*)" button$/, (button) => {
	switch (button) {
		case "Login":
			smartBearLoginPage.clickOnLoginButton()
			break
		case "Check All":
			smartBearOrdersPage.clickOnCheckAllButton()
			break
		case "Uncheck All":
			smartBearOrdersPage.clickOnUncheckAllButton()
			break
		case "Delete Selected":
			smartBearOrdersPage.clickOnDeleteSelectedButton()
			break
		case "Process":
			smartBearOrdersPage.clickOnProcessButton()
			break
		default:
			throw new Error(`"${button}" does not match any case!!!`)
	}
});

Then(/^user should see "([^"]*)" message$/, (message) => {
	smartBearLoginPage.getErrorMessage().should('have.text', message)
});

Then(/^user should be routed to "([^"]*)"$/, (url) => {
	cy.url().should('eq', url)
});

Then(/^validate below menu items are displayed$/, (dataTable) => {
	const menuItems = dataTable.rawTable.flat()
	cy.log(dataTable)
	cy.log(menuItems)

	for (let i = 0; i < smartBearOrdersPage.getWebOrdersMenuItems(); i++) {
		cy.log(smartBearOrdersPage.getWebOrdersMenuItems().eq(i))
	}

	smartBearOrdersPage.getWebOrdersMenuItems().each(($el, index) => {
		cy.wrap($el).should('have.text', menuItems[index])
	});
});

Then(/^all rows should be checked$/, () => {
	smartBearOrdersPage.getAllOrdersRowsCheckBoxes(1, 'input').each(($el) => {
		cy.wrap($el).should('be.checked')
	})
});

Then(/^all rows should be unchecked$/, () => {
	smartBearOrdersPage.getAllOrdersRowsCheckBoxes().each(($el) => {
		cy.wrap($el).should('not.be.checked')
	})
});

Then(/^validate all orders are deleted from the List of All Orders$/, () => {
	smartBearOrdersPage.getAllOrdersRowsCheckBoxes().should('have.length', 0)
});

Then(/^validate user sees "([^"]*)" message$/, (message) => {
	smartBearOrdersPage.getOrderMessage().should('include.text', message)
});

When(/^user clicks on "([^"]*)" menu item$/, (menuItem) => {
	smartBearOrdersPage.clickOnWebOrdersMenuItem(menuItem)
});

When(/^user enters all product information$/, () => {
	smartBearOrdersPage.enterProductInfo(
		order.productInfo.product,
		order.productInfo.quantity
	)
});

When(/^user enters all address information$/, () => {
	smartBearOrdersPage.enterAddressInfo(
		order.addressInfo.customerName,
		order.addressInfo.street,
		order.addressInfo.city,
		order.addressInfo.state,
		order.addressInfo.ZIPCODE
	)
});

When(/^user enters all payment information$/, () => {
	smartBearOrdersPage.enterPaymentInfo(
		order.paymentInfo.cardType,
		order.paymentInfo.cardNumber,
		order.paymentInfo.expirationDate
	)
});

Then(/^validate all information entered displayed correct with the order$/, () => {
	smartBearOrdersPage.getAllOrdersRowByIndex(2)
	.should('include.text', order.addressInfo.customerName)
	.and('include.text', order.productInfo.product)
	.and('include.text', order.productInfo.quantity)
	.and('include.text', order.addressInfo.street)
	.and('include.text', order.addressInfo.city)
	.and('include.text', order.addressInfo.state)
	.and('include.text', order.addressInfo.ZIPCODE)
	.and('include.text', order.paymentInfo.cardType)
	.and('include.text', order.paymentInfo.cardNumber)
	.and('include.text', order.paymentInfo.expirationDate)
});
