/** Generated from: features/staking-simulator.feature */
import { test } from "playwright-bdd";

test.describe("MEME Staking Simulator", () => {

  test("Verify Initial Stake Display without Wallet Connection", async ({ Given, page, Then }) => {
    await Given("I open the MEME Staking page", null, { page });
    await Then("I should see the stake value as \"69,696.69\" and steaks per week value on the basis of stake multiplier which should be \"1x\"", null, { page });
  });

  test("Verify STAKES and STAKES / WEEK value on change of STAKE(Min)", async ({ Given, page, When, Then }) => {
    await Given("I open the MEME Staking page", null, { page });
    await When("I enter \"123\" into the stake input field", null, { page });
    await Then("I should see the stake value as \"123\" and steaks per week value on the basis of stake multiplier which should be \"1x\"", null, { page });
  });

  test("Verify STAKES MAX button to make Maximum STAKES", async ({ Given, page, When, Then }) => {
    await Given("I open the MEME Staking page", null, { page });
    await When("I click on MAX button");
    await Then("I should see the stake value as \"6900000\" and steaks per week value on the basis of stake multiplier which should be \"1x\"", null, { page });
  });

  test("Verify STAKES Slider", async ({ Given, page, When, Then }) => {
    await Given("I open the MEME Staking page", null, { page });
    await When("I move slider by \"80\"%");
    await Then("I should see the stake value as \"5520000\" and steaks per week value on the basis of stake multiplier which should be \"1x\"", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use("features/staking-simulator.feature"),
  $bddFileMeta: ({}, use) => use(bddFileMeta),
});

const bddFileMeta = {
  "Verify Initial Stake Display without Wallet Connection": {"pickleLocation":"3:3"},
  "Verify STAKES and STAKES / WEEK value on change of STAKE(Min)": {"pickleLocation":"7:3"},
  "Verify STAKES MAX button to make Maximum STAKES": {"pickleLocation":"12:3"},
  "Verify STAKES Slider": {"pickleLocation":"17:3"},
};