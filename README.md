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

## Install @badeball/cypress-cucumber-preprocessor
This preprocessor aims to provide a developer experience and behavior similar to that of Cucumber, to Cypress.

```bash
npm install @badeball/cypress-cucumber-preprocessor -D
```

## Install @bahmutov/cypress-esbuild-preprocessor

```bash
npm install @bahmutov/cypress-esbuild-preprocessor -D
```

## Introduction
The cypress-cucumber-preprocessor adds support for using feature files when testing with Cypress.

```gherkin
Feature: TechGlobal Home Page

  Scenario: Validate the Logo
    Given I am on the TechGlobal Home Page
    Then I should see the logo
```

## Update cypress.config.js with below code

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
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
    "@badeball/cypress-cucumber-preprocessor": "^20.0.5",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.1",
    "cypress": "^13.10.0",
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "stepDefinitions": "cypress/e2e/step_definitions/**/*.js"
  }
}
```

# Create the Folder Structure 
Create the following directory structure

```bash
cypress-automation/
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   ├── tests/
│   │   └── pages/
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

## Configure Visual Studio Code and Install Extensions

1. VSCode Cucumber (Gherkin) Language Support + Format + Steps/PageObjects Autocomplete:

This extension adds rich language support for the Cucumber (Gherkin) language to VS Code

2. Cuke Step Definition Generator:

This extension will help the user by generating the Cucumber Glue / Step Definition snippet for the selected statement. It will come as very handy while working with Cucumber JS in VS Code.

## Write Your Actual Code
``` javascript
/// <reference types="cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

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
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

Given("I am on the TechGlobal Home Page", function () {
    cy.visit('https://www.techglobal-training.com/')
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

When("I enter password as {string}", (password) => {
    loginPage.enterPassword(password)
});

When("I click on the login button", () => {
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
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

require('dotenv').config();

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  env: { ...process.env },
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
```

## Use Environment Variables in Step Definitions

``` javascript
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
```

## Diagnostics / dry run

A diagnostics utility is provided to verify that each step matches one, and only one, step definition. This can be run as shown below.

``` bash
npx cypress-cucumber-diagnostics
```

## Tags

Integrating tags with Cypress feature files involves leveraging Cucumber tags to organize and selectively run your tests based on predefined criteria.

``` gherkin
@Smoke @Regression
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

### Configure cypress.config.js
Normally when running a subset of scenarios using cypress run --env tags=@foo, you could potentially encounter files containing no matching scenarios. These can be pre-filtered away by setting filterSpecs to true, thus saving you execution time.

By default, all filtered tests are made pending using it.skip method. If you want to completely omit them, set omitFiltered to true.

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

require('dotenv').config();

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  env: { 
    ...process.env,
    filterSpecs: true,
    omitFiltered: true
   },
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
```

# Creating Custom Scripts

Open package.json file and add the following scripts to the 'scripts' section of your package.json file. 

This section defines shorthand commands for running your Cypress tests with different configurations.

```json
{
  "name": "cypress-ui-framework-bdd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "npx cypress run",
    "test:dryRun": "npx cypress-cucumber-diagnostics",
    "test:smoke": "npx cypress run --env tags=@Smoke",
    "test:regression": "npx cypress run --env tags=@Regression"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^20.0.5",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.1",
    "cypress": "^13.10.0",
    "dotenv": "^16.4.5"
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "stepDefinitions": "cypress/e2e/step_definitions/**/*.js"
  }
}
```

## HTML, JSON, NDJSON Reports

Update package.json

``` json
{
  "name": "cypress-ui-framework-bdd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "npx cypress run",
    "test:dryRun": "npx cypress-cucumber-diagnostics",
    "test:smoke": "npx cypress run --env tags=@Smoke",
    "test:regression": "npx cypress run --env tags=@Regression"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^20.0.5",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.1",
    "cypress": "^13.10.0",
    "dotenv": "^16.4.5"
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "stepDefinitions": "cypress/e2e/step_definitions/**/*.js",
    "html": {
      "enabled": true,
      "output": "cypress/reports/cucumber-html/cucumber-report.html"
    },
    "messages": {
      "enabled": true,
      "output": "cypress/reports/cucumber-ndjson/cucumber-report.ndjson"
    },
    "json": {
      "enabled": true,
      "output": "cypress/reports/cucumber-json/cucumber-report.json"
    }
  }
}
```

## Install Multiple Cucumber HTML Reporter Dependency for Better Reports

Multiple Cucumber HTML Reporter is a reporting module for Cucumber to parse the JSON output to a beautiful report. 

``` bash
npm install multiple-cucumber-html-reporter -D
```

## Create a reports.js File in the Root with below

``` javascript
// reports.js
const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'cypress/reports/cucumber-json',
  reportPath: 'cypress/reports/html-multi-report',
  ignoreBadJsonFile: false,
  displayReportTime: true,
  displayDuration: true,
  metadata: {
    device: 'Local test machine',
    platform: { name: process.env.CI ? 'Windows' : 'MacOS' },
  },
})
```
## Update package.json with New Custom Scripts

``` json
{
  "name": "cypress-ui-framework-bdd",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "rm-rf reports && npx cypress run",
    "test:dryRun": "npx cypress-cucumber-diagnostics",
    "test:smoke": "npx cypress run --env tags=@Smoke",
    "test:regression": "npx cypress run --env tags=@Regression",
    "test:smoke:prettier": "npx cypress run --env tags=@Regression ; node reports.js",
    "test:regression:prettier": "npx cypress run --env tags=@Regression ; node reports.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^20.0.5",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.1",
    "cypress": "^13.10.0",
    "dotenv": "^16.4.5",
    "multiple-cucumber-html-reporter": "^3.6.2"
  },
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "stepDefinitions": "cypress/e2e/step_definitions/**/*.js",
    "html": {
      "enabled": true,
      "output": "cypress/reports/cucumber-html/cucumber-report.html"
    },
    "messages": {
      "enabled": true,
      "output": "cypress/reports/cucumber-ndjson/cucumber-report.ndjson"
    },
    "json": {
      "enabled": true,
      "output": "cypress/reports/cucumber-json/cucumber-report.json"
    }
  }
}
```

# Run Tests

```
npm run test:smoke:prettier
```