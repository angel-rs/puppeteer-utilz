import puppeteer from 'puppeteer';

import { getFrame } from 'src/utils';

describe('with the imported get-frame module', () => {
  it('must be possible: return a frame', async () => {
    expect.hasAssertions();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://allwebco-templates.com/support/S_script_IFrame.htm');

    const frameName = 'Framename';
    const frame = getFrame(page, frameName);
    await browser.close();

    expect(frame?.name()).toBe(frameName);
  }, 30000);

  it('must be possible: return null if frame not found', async () => {
    expect.hasAssertions();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://allwebco-templates.com/support/S_script_IFrame.htm');

    const frameName = 'test';
    const frame = getFrame(page, frameName);
    await browser.close();

    expect(frame?.name()).toBe(undefined);
  }, 30000);
});