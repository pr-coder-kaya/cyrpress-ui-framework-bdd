/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

Given("I am on the TechGlobal Home Page", function () {
    cy.visit(Cypress.env('baseURL'))
});

Then("I should see the url and title properly displayed", () => {
    cy.title().should('eq', 'TechGlobal Training | Home')
    cy.url().should('contain', 'techglobal-training')
});

Given("I am on the TechGlobal Login Project", () => {
    cy.visit(`${Cypress.env('baseURL')}frontend/project-2`)
});

When("I enter username as {string}", (username) => {
    loginPage.enterUsername(username)
});

When("I enter password as {string}", (password) => {
    loginPage.enterPassword(password)
});

When("I click on the login button", () => {
    loginPage.clickOnLoginButton()
});

Then("I should see the success message as {string}", (message) => {
    loginPage.getSuccessMessage().should('be.visible').and('have.text', message)
});