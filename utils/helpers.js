export async function getLoopValue(page, label) {
    const locator = page.getByText(label).locator('..');
    const count = await locator.locator('.inline-block').count();
    let value='';
    for (let i = 0; i < count; i++) {
      const digit = await locator.locator(`.inline-block:nth-child(${i+1})`).textContent();
      value += digit;
    }
    return Number(convertCommaSeperatedNumbers(value));
}

export function convertCommaSeperatedNumbers(commaSeperated) {
    return Number(commaSeperated.replaceAll(',',''));
}

export async function getWasted(page) {
    const wastedParent = page.getByText('WASTED').locator('..');
    const wastedLocator = await wastedParent.locator('[data-state="closed"]');
    return convertCommaSeperatedNumbers(await wastedLocator.textContent())
}