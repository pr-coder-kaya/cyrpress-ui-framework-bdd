class SmartBearLoginPage {
    getUsernameField() {
        return cy.get('#ctl00_MainContent_username')
    }

    getPasswordField() {
        return cy.get('#ctl00_MainContent_password')
    }

    getLoginButton() {
        return cy.get('#ctl00_MainContent_login_button')
    }

    getErrorMessage() {
        return cy.get('#ctl00_MainContent_status')
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
}

export default SmartBearLoginPage;