# Set up a New Project

Make sure Node.js is installed on your machine

Ensure your favorite IDE installed on your machine (VS Code)

Create an empty directory for your project (cypress-automation)

## Initialize The Project

Open the directory in the IDE and initialize a Node.js project

```bash
npm init -y
```

## Install Cypress

```bash
npm install cypress -D
```

## Open Cypress
This will create a cypress folder with default directories and configuration files.

```bash
npx cypress open
```

## Install Cucumber Preprocessor
This preprocessor aims to provide a developer experience and behavior similar to that of Cucumber, to Cypress.

```bash
npm install cypress-cucumber-preprocessor -D
```

## Introduction
The cypress-cucumber-preprocessor adds support for using feature files when testing with Cypress.

```gherkin
Feature: TechGlobal Home Page

  Scenario: Validate the Logo
    Given I am on the TechGlobal Home Page
    Then I should see the logo
```

## Update  cypress.config.js with below code

```javascript
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber())
    },
    specPattern: "**/*.feature",
    supportFile: false,
  },
});
```

## Update package.json with below code

```json
{
  "name": "cypress-ui-framework-bdd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "cypress": "^13.10.0",
    "cypress-cucumber-preprocessor": "^4.3.1"
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "step_definitions": "cypress/e2e/step-definitions"
  }
}
```

# Create the Folder Structure 
Create the following directory structure


```bash
cypress-automation/
├── cypress/
│   ├── e2e/
|   |   ├── features/
|   |   ├── tests/
|   |   └── pages/
│   ├── fixtures/
│   └── support/
├── node_modules/
├── cypress.config.js
└── package.json
```

# Write Your First Test

## Create a Feature File

```
touch cypress/e2e/features/TechGlobal.feature
```

## Write a Basic Feature with a Basic Scenario
``` gherkin
Feature: TechGlobal Validation

  Scenario: Validate the Home Page Visit
    Given I am on the TechGlobal Home Page
    Then I should see the url and title properly displayed
```

## Create a Step Definitions File

```
touch cypress/e2e/step_definitions/techglobal.cy.js
```

## Write Your Actual Code
``` javascript
/// <reference types="cypress" />
import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("I am on the TechGlobal Home Page", () => {
    cy.visit('https://techglobal-training.com/')
});

Then("I should see the url and title properly displayed", () => {
    cy.title().should('eq', 'TechGlobal Training | Home')
    cy.url().should('contain', 'techglobal-training')
});
```

# Implement Page Object Model (POM)

This is used to store page-specific locators and actions

Advantage: Reusable page objects
## Create a Page Object File

```
touch cypress/e2e/pages/LoginPage.js
```

## Define The Page Object

``` javascript
class LoginPage {
    getUsernameField() {
        return cy.get('#username')
    }

    getPasswordField() {
        return cy.get('#password')
    }

    getLoginButton() {
        return cy.get('#login_btn')
    }

    getSuccessMessage() {
        return cy.get('#success_lgn')
    }

    getLogoutButton() {
        return cy.get('#logout')
    }

    clickOnLoginButton() {
        this.getLoginButton().click()
    }

    enterUsername(username) {
        this.getUsernameField().type(username)
    }

    enterPassword(password) {
        this.getPasswordField().type(password)
    }

    login(username, password) {
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickOnLoginButton()
    }

    logout() {
        this.getLogoutButton().click()
    }
}

export default LoginPage;
```
## Use Page Objects in Tests

Advantage: Cleaner and more maintainable test files

## Write a New Scenario in the Feature File
``` gherkin
Feature: TechGlobal Validation

  Scenario: Validate the Home Page Visit
    Given I am on the TechGlobal Home Page
    Then I should see the url and title properly displayed

  Scenario: Validate the Successful Login
    Given I am on the TechGlobal Login Project
    When I enter username as "TechGlobal"
    And I enter password as "Test1234"
    And I click on the login button
    Then I should see the success message as "You are logged in"
```

## Add the New Step Definitions
``` javascript
/// <reference types="cypress" />
import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

Given("I am on the TechGlobal Home Page", () => {
    cy.visit('https://techglobal-training.com/')
});

Then("I should see the url and title properly displayed", () => {
    cy.title().should('eq', 'TechGlobal Training | Home')
    cy.url().should('contain', 'techglobal-training')
});

Given("I am on the TechGlobal Login Project", () => {
    cy.visit('https://www.techglobal-training.com/frontend/project-2')
});

When("I enter username as {string}", (username) => {
    loginPage.enterUsername(username)
});

And("I enter password as {string}", (password) => {
    loginPage.enterPassword(password)
});

And("I click on the login button", () => {
    loginPage.clickOnLoginButton()
});

Then("I should see the success message as {string}", (message) => {
    loginPage.getSuccessMessage().should('be.visible').and('have.text', message)
});
```

# Configure Environment Variables

This is used to protect sensitive or environment-specific data

Advantage: Secure and flexible test configurations

## Install the dotenv dependency

```
npm install dotenv -D
```

## Create a .env File

```
touch .env
```

## Add Environment Variables

```
baseURL=https://www.techglobal-training.com/
```

## Modify cypress.config.js file

``` javascript
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
require('dotenv').config();

module.exports = defineConfig({
  env: { ...process.env },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber())
    },
    specPattern: "**/*.feature",
    supportFile: false,
  },
});
```

## Use Environment Variables in Step Definitions

``` javascript
/// <reference types="cypress" />
import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

Given("I am on the TechGlobal Home Page", () => {
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

And("I enter password as {string}", (password) => {
    loginPage.enterPassword(password)
});

And("I click on the login button", () => {
    loginPage.clickOnLoginButton()
});

Then("I should see the success message as {string}", (message) => {
    loginPage.getSuccessMessage().should('be.visible').and('have.text', message)
});
```

# Run Tests

```
npx cypress run
```