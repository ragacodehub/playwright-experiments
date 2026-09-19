import { test, expect, APIRequestContext, request } from '@playwright/test';
import { ApiHelper } from '../../../utils/booking.helper';

let apiContext: APIRequestContext;
let apiHelper: ApiHelper;

test.beforeAll(async () => {
  apiContext = await request.newContext();
  apiHelper = new ApiHelper(apiContext);
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test('Verify bookings are fetched', async () => {
  const response = await apiHelper.get('booking');
  expect(response.ok()).toBe(true);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody[0]).toHaveProperty('bookingid');
  expect(typeof responseBody[0].bookingid).toBe('number');
});
