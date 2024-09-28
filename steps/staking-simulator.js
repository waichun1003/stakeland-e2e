import {convertCommaSeperatedNumbers} from "../utils/helpers";

const {StakingSimulatorPage} = require("../pages/staking-simulator");
import { createBdd } from 'playwright-bdd';
import {chromium} from "@playwright/test";
const { Given, When, Then } = createBdd();

/**
 * @type {StakingSimulatorPage}
 * An instance of the StakingSimulatorPage class used for interacting with the staking simulator page.
 */
let stakingSimulatorPage;

Given('I open the MEME Staking page', async function ({page}) {
    stakingSimulatorPage = new StakingSimulatorPage(page);
    await stakingSimulatorPage.initializePage();
    await page.waitForTimeout(1000);
});

Then('I should see the stake value as {string} and steaks per week value on the basis of stake multiplier which should be {string}', async function ({page}, stakeValue, multiplier) {
    await stakingSimulatorPage.checkStakesAndSteakPerWeekValuesWithMultiplier(stakeValue, multiplier);
});

When('I enter {string} into the stake input field', async function ({page},string) {
    await stakingSimulatorPage.setInputStake(string);
});

When('I click on MAX button', async function () {
    await stakingSimulatorPage.clickMax();
});

When('I move slider by {string}%', async function ({}, percent, multiplier) {
    await stakingSimulatorPage.slide(percent, multiplier);
});