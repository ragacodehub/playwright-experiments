import { test} from '@playwright/test';

//Using conditional skip
test.describe('DEV Tests', ()=>
{
  test.skip(process.env.ENV !== 'DEV')
  test('Navigate to DEV page', async ({ page }) => {
  await page.goto('/');
 });

})
 
//Tag based
  test('@qa Navigate to QA page', async ({ page }) => {
  await page.goto('/');
 });
