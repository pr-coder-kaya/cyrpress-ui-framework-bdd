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