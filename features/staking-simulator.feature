Feature: MEME Staking Simulator

  Scenario: Verify Initial Stake Display without Wallet Connection
    Given I open the MEME Staking page
    Then I should see the stake value as "69,696.69" and steaks per week value on the basis of stake multiplier which should be "1x"

  Scenario: Verify STAKES and STAKES / WEEK value on change of STAKE(Min)
    Given I open the MEME Staking page
    When I enter "123" into the stake input field
    Then I should see the stake value as "123" and steaks per week value on the basis of stake multiplier which should be "1x"

  Scenario: Verify STAKES MAX button to make Maximum STAKES
    Given I open the MEME Staking page
    When I click on MAX button
    Then I should see the stake value as "6900000" and steaks per week value on the basis of stake multiplier which should be "1x"

  Scenario: Verify STAKES Slider
    Given I open the MEME Staking page
    When I move slider by "80"%
    Then I should see the stake value as "5520000" and steaks per week value on the basis of stake multiplier which should be "1x"