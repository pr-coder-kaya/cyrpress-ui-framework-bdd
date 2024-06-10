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