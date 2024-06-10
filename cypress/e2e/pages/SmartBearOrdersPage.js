class SmartBearOrdersPage {
    getWebOrdersMenuItems() {
        return cy.get('#ctl00_menu a')
    }

    getCheckAllButton() {
        return cy.get('#ctl00_MainContent_btnCheckAll')
    }

    getUncheckAllButton() {
        return cy.get('#ctl00_MainContent_btnUncheckAll')
    }

    getDeleteSelectedButton() {
        return cy.get('#ctl00_MainContent_btnDelete')
    }

    getAllOrdersTable() {
        return cy.get('#ctl00_MainContent_orderGrid')
    }

    getAllOrdersRowsCheckBoxes() {
        return this.getAllOrdersTable().get('tr td:nth-child(1)>input')
    }

    getAllOrdersRowByIndex(index) {
        return this.getAllOrdersTable().get(`tr:nth-child(${index})`)
    }

    getOrderMessage() {
        return cy.get('#ctl00_MainContent_orderMessage')
    }

    getProductDropdown() {
        return cy.get('#ctl00_MainContent_fmwOrder_ddlProduct')
    }

    getQuantityInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_txtQuantity')
    }

    getPricePerUnitInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_txtUnitPrice')
    }

    getDiscountInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_txDiscount')
    }

    getTotalInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_txtTotal')
    }

    getCustomerNameInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_txtName')
    }

    getStreetInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_TextBox2')
    }

    getCityInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_TextBox3')
    }

    getStateInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_TextBox4')
    }

    getZIPCODEInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_TextBox5')
    }

    getCardTypesRadioButtons() {
        return cy.get('#ctl00_MainContent_fmwOrder_cardList input')
    }

    getCardNumberInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_TextBox6')
    }

    getExpirationDateInput() {
        return cy.get('#ctl00_MainContent_fmwOrder_TextBox1')
    }

    getProcessButton() {
        return cy.get('#ctl00_MainContent_fmwOrder_InsertButton')
    }

    clickOnCheckAllButton() {
        this.getCheckAllButton().click()
    }

    clickOnUncheckAllButton() {
        this.getUncheckAllButton().click()
    }

    clickOnDeleteSelectedButton() {
        this.getDeleteSelectedButton().click()
    }

    clickOnWebOrdersMenuItem(itemText) {
        this.getWebOrdersMenuItems().each(($el) => {
            if($el.text().trim() === itemText) {
                cy.wrap($el).click()
                return
            }
        })
    }

    selectProduct(productName) {
        this.getProductDropdown().select(productName)
    }

    enterProductInfo(productName, quantity, pricePerUnit = 0, discount = 0, total = 0) {
        this.selectProduct(productName)
        this.getQuantityInput().type(quantity)
        if(pricePerUnit !== 0) this.getPricePerUnitInput().type(pricePerUnit)
        if(discount !== 0) this.getDiscountInput().type(discount)
        if(total !== 0) this.getTotalInput().type(total)
    }

    enterAddressInfo(customerName, street, city, state, ZIPCODE) {
        this.getCustomerNameInput().type(customerName)
        this.getStreetInput().type(street)
        this.getCityInput().type(city)
        this.getStateInput().type(state)
        this.getZIPCODEInput().type(ZIPCODE)
    }

    selectCardType(cardType) {
        this.getCardTypesRadioButtons().each(($el) => {
            if($el.attr('value') === cardType) {
                cy.wrap($el).click()
                return
            }
        })
    }

    enterPaymentInfo(cardType, cardNumber, expirationDate) {
        this.selectCardType(cardType)
        this.getCardNumberInput().type(cardNumber)
        this.getExpirationDateInput().type(expirationDate)
    }

    clickOnProcessButton() {
        this.getProcessButton().click()
    }
}

export default SmartBearOrdersPage;