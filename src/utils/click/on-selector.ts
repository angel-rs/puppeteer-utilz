import chalk from 'chalk';
import {
  Frame,
  Page,
} from 'puppeteer';

import {
  logger,
} from 'src/internals';
import {
  retry,
} from 'src/utils';

const _onSelector = async (component: Frame | Page, selector: string) => {
  try {
    logger.debug(chalk`{gray Waiting for the selector: "${selector}"}`);
    const element = await component.waitForSelector(selector);
    logger.debug(chalk`{gray Waiting for the selector: "${selector}"} {green [ok]}`);

    if (element) {
      logger.debug(chalk`Clicking the selector: {green "${selector}"}`);
      await element.click();
      logger.debug(chalk`Clicking the selector: {green "${selector}"} {green [ok]}`);
    } else {
      throw new Error(`Element specified by the selector: "${selector}", is not found in DOM`);
    }
  } catch (error) {
    logger.debug(chalk`{red Cannot click on the selector: "${selector}"}`);
    throw new Error(error);
  }
};

const onSelector = async (component: Frame | Page, selector: string) => {
  await _onSelector(component, selector);
};

const onSelectorWithRetries = async (component: Frame | Page, selector: string, retries: number) => {
  await retry(async () => {
    try {
      await _onSelector(component, selector);
    } catch (error) {
      throw new Error(error);
    }
  }, {
    retries,
  });
};

export {
  onSelector,
  onSelectorWithRetries,
};
