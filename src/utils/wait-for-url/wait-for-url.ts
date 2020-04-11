import {
  Page,
} from 'puppeteer';

import {
  delay,
} from 'src/utils';

const waitForURL = (page: Page, expectedURL: string) => (
  new Promise(async resolve => {
    let URLsAreDifferent = true;

    while (URLsAreDifferent) {
      const currentURL = page.url();

      if (currentURL === expectedURL) {
        URLsAreDifferent = false;
      }

      await delay(500);
    }

    resolve(true);
  })
);

export {
  waitForURL,
};
