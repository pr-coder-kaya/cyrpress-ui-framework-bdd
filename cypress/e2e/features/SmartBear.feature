@Regression
Feature: Smartbear Validation

    Background:
        Given user is on "http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx"

    Scenario: Validate invalid login attempt
        When user enters username as "abcd"
        And user enters password as "abcd1234"
        And user clicks on "Login" button
        Then user should see "Invalid Login or Password." message

    Scenario: Validate valid login attempt
        When user enters username as "Tester"
        And user enters password as "test"
        And user clicks on "Login" button
        Then user should be routed to "http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/"

    Scenario: Validate "Web Orders" menu items
        When user enters username as "Tester"
        And user enters password as "test"
        And user clicks on "Login" button
        Then user should be routed to "http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/"
        And validate below menu items are displayed
            | View all orders   |
            | View all products |
            | Order             |

    Scenario: Validate "Check All" and "Uncheck All" links
        When user enters username as "Tester"
        And user enters password as "test"
        And user clicks on "Login" button
        Then user should be routed to "http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/"
        When user clicks on "Check All" button
        Then all rows should be checked
        When user clicks on "Uncheck All" button
        Then all rows should be unchecked

    Scenario: Validate "Delete Selected" button
        When user enters username as "Tester"
        And user enters password as "test"
        And user clicks on "Login" button
        Then user should be routed to "http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/"
        When user clicks on "Check All" button
        And user clicks on "Delete Selected" button
        Then validate all orders are deleted from the List of All Orders
        And validate user sees "List of orders is empty. In order to add new order use this link." message

    Scenario: Validate adding new order
        When user enters username as "Tester"
        And user enters password as "test"
        And user clicks on "Login" button
        Then user should be routed to "http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/"
        When user clicks on "Order" menu item
        And user enters all product information
        And user enters all address information
        And user enters all payment information
        And user clicks on "Process" button
        And user clicks on "View all orders" menu item
        Then validate all information entered displayed correct with the order