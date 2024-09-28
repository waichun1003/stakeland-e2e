import {convertCommaSeperatedNumbers, getLoopValue, getWasted} from "../utils/helpers";
import logger from "../utils/logger";

const { test, expect } = require('@playwright/test');

/**
 * Represents the staking simulator page in the application.
 */
export class StakingSimulatorPage {
    /**
     * Creates an instance of the StakingSimulatorPage class.
     *
     * @param {import('playwright').Page} page - The Playwright page object representing the browser page.
     */
    constructor(page) {
        this.page = page;
    }

    async initializePage() {
        const page = this.page;
        await page.goto('https://www.stakeland.com/');
        logger.info('https://www.stakeland.com/ Website Visited')
        const skipBtn = page.getByText("Skip");
        await page.waitForTimeout(1000);
        await skipBtn.click();
        logger.info('Clicked Skip Button')
        await page.waitForTimeout(1000);
        const dialog = await page.locator('[role=\'dialog\']');
        await expect(dialog).toBeVisible();
        const dialogCloseBtn = await page.waitForSelector('.text-foreground > svg');
        await dialogCloseBtn.click();
        logger.info('Clicked Dialog Close Button')
    }

    async checkStakesAndSteaks(expectedStakesValue, multiplier) {
        const currentStakesValue = await getLoopValue(this.page, 'STAKES');
        expect(currentStakesValue).toBe(expectedStakesValue);
        logger.info('current Stakes Value visible')

        const currentSteaksValue = await getLoopValue(this.page, 'STEAKS / WEEK');
        expect(currentSteaksValue).toBe(expectedStakesValue * (multiplier ?? fixtures.initialMultiplierValue));
        logger.info('current STEAKS / WEEK Value visible')
    }

    async checkStakesAndSteakPerWeekValuesWithMultiplier(expectedStakeValue, expectedMultiplier) {
        const page = this.page;
        const expectedMultiplierFormatted =Number(expectedMultiplier.replaceAll('x', ''));
        const multiplierLocator = await page.locator('.text-2xl.font-bold[data-state=\'closed\']');
        const multiplier = Number((await multiplierLocator.textContent()).replace('x', ''));
        expect(multiplier).toBe(expectedMultiplierFormatted);
        logger.info('multiplier visible')

        const stakeAmountInput = convertCommaSeperatedNumbers(await page.locator('[aria-label=\'Stake Amount\']').inputValue());
        expect(stakeAmountInput).toBe(convertCommaSeperatedNumbers(expectedStakeValue));
        logger.info('stake Amount Input visible')

        const initialWasted = await getWasted(page);
        expect(initialWasted).toBe(fixtures.maxStakes - stakeAmountInput)
        logger.info('initial Wasted visible')
        await this.checkStakesAndSteaks(convertCommaSeperatedNumbers(expectedStakeValue), expectedMultiplierFormatted)
    }

    async setInputStake(inputStake) {
        const page = this.page;
        await page.waitForTimeout(1000);
        const stakeAmountInputLocator = page.locator('[aria-label=\'Stake Amount\']');
        await stakeAmountInputLocator.fill(convertCommaSeperatedNumbers(inputStake).toString());
        await page.waitForTimeout(1000);
        logger.info('stake Amount Input Locator visible')
    }

    async clickMax() {
        const page = this.page;
        await page.waitForTimeout(1000);
        const maxBtn = await page.getByText('MAX');
        await maxBtn.click();
        logger.info('Clicked MAX')
    }

    async slide(percentString) {
        const page = this.page;
        const percent = Number(percentString) / 100
        await page.waitForTimeout(1000);
        const sliderThumbLocator = page.locator('[role="slider"]');
        const sliderLocator = page.locator('.slider-root-layer[data-orientation="horizontal"]').locator('..');
        const sliderBoundingBox = await sliderLocator.boundingBox();
        const xPos = percent * sliderBoundingBox.width;
        await sliderThumbLocator.hover();
        await page.mouse.down();
        await sliderLocator.hover({position:{y:0, x:xPos}, force:true});
        await page.mouse.up();
        await page.waitForTimeout(1000);
        logger.info('Slider Moved to '+percentString+"%")
    }
}

const fixtures = {
    maxStakes: 6900000,
}