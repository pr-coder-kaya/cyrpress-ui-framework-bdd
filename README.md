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
npm install @badeball/cypress-cucumber-preprocessor -D
```