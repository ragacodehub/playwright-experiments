import { test as base, Page } from '@playwright/test';

type assignSession = {
  session: string;
  userName: 'standard' | 'problem' | 'performance';
  injectSession: Page;
};

export const storageSession = base.extend<assignSession>({
  userName: ['standard', { option: true }],
  session: async ({ userName }, use) => {
    await use(`.auth/saucedemo/${userName}.json`);
  },
  injectSession: async ({ session, browser }, use) => {
    const context = await browser.newContext({ storageState: session });
    const page = await context.newPage();
    await use(page);
  },
});
