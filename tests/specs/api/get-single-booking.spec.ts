import { test, expect, APIRequestContext, request } from '@playwright/test';
import { ApiHelper } from '../../../utils/booking.helper';
import singleBooking from '../../../data/api/single-booking.json';
import Ajv from 'ajv';
import bookingSchema from './../../../schema/booking.schema.json';

let apiContext: APIRequestContext;
let apiHelper: ApiHelper;

test.beforeAll(async () => {
  apiContext = await request.newContext();
  apiHelper = new ApiHelper(apiContext);
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe('Verify single booking Id', () => {
  test('Verify single booking details feteched successfully', async () => {
    const response = await apiHelper.getById(singleBooking.bookingid);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
    expect(responseBody).toHaveProperty('totalprice');
    expect(typeof responseBody.totalprice).toBe('number');
    expect(responseBody).toHaveProperty('depositpaid');
    expect(typeof responseBody.depositpaid).toBe('boolean');
    expect(responseBody).toHaveProperty('bookingdates');
    expect(typeof responseBody.bookingdates).toBe('object');
    expect(responseBody.bookingdates).toHaveProperty('checkin');
    expect(responseBody.bookingdates).toHaveProperty('checkout');
    expect(typeof responseBody.bookingdates.checkin).toBe('string');
    expect(typeof responseBody.bookingdates.checkout).toBe('string');
  });

  test('Verify invalid booking id', async () => {
    const response = await apiHelper.getById(singleBooking.invalidBookingId);
    expect(response.status()).toBe(404);
  });

  test('Verify booking cannot be retrieved using a negative booking ID', async () => {
    const response = await apiHelper.getById(singleBooking.negativeBookingId);
    expect(response.status()).toBe(404);
  });

  test('Verify checkout date is greater than or equal to checkin date', async () => {
    const response = await apiHelper.getById(singleBooking.bookingid);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const checkin = responseBody.bookingdates.checkin;
    const checkout = responseBody.bookingdates.checkout;
    expect(checkin).toMatch(dateRegex);
    expect(checkout).toMatch(dateRegex);
    expect(new Date(checkout).getTime()).toBeGreaterThanOrEqual(new Date(checkin).getTime());
  });

  test('Verify booking response matches schema', async () => {
    const response = await apiHelper.getById(singleBooking.bookingid);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const ajv = new Ajv();
    const validate = ajv.compile(bookingSchema);
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();
  });
});
