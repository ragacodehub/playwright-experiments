import { expect } from '@playwright/test';
import { test as setup } from '../../../fixtures/saucedemo/pages.fixture';
import { getBaseURL } from '../../../utils/config-constants';
import testdata from '../../../data/saucedemo/ui/ui-data.json';

setup('Multi User Authentication Setup', async ({ injectSession, loginPage }) => {
  type UserType = keyof typeof testdata.users;
  const users: UserType[] = ['performance', 'standard', 'problem'];
  for (const user of users) {
    await injectSession.goto(getBaseURL());
    await loginPage.login(testdata.users[user], testdata.password);
    await expect(injectSession).toHaveURL(/inventory.html/);
    await injectSession.context().storageState({ path: `.auth/saucedemo/${user}.json` });
  }
});
