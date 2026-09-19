import { expect } from '@playwright/test';
import AJV from "ajv";
import { test } from '../../../fixtures/API/token.fixture.ts';
import createBookingData from '../../../data/api/create-booking.json';
import updateBookingData from '../../../data/api/update-booking.json';
import schema from '../../../schema/booking.schema.json';

test.describe('Update booking API', () => {
  let bookingId: number;

  test.beforeAll(async ({ apiHelper }) => {
    const response = await apiHelper.post('booking', { data: createBookingData });
    bookingId = (await response.json()).bookingid;
  });

  test("Update booking with valid details", async ({ apiHelper, token }) => {
    const response = await apiHelper.put(`booking/${bookingId}`, {
      headers: await apiHelper.getToken(token),
      data: updateBookingData.validBooking,
    });
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(updateBookingData.validResponse);
    expect(responseBody).toMatchObject(updateBookingData.validBooking);
    const validate = new AJV().compile(schema);
    expect(validate(responseBody)).toBeTruthy();
  });

  test("Update booking with invalid booking id", async ({ apiHelper, token }) => {
    const response = await apiHelper.put(`booking/${updateBookingData.invalidBookingId}`, {
      headers: await apiHelper.getToken(token),
      data: updateBookingData.validBooking,
    });
    expect(response.status()).toBe(updateBookingData.invalidResponse);
  });

  test("Update booking by missing few details", async ({ apiHelper, token }) => {
    const response = await apiHelper.put(`booking/${bookingId}`, {
      headers: await apiHelper.getToken(token),
      data: updateBookingData.missingInfo,
    });
    expect(response.status()).toBe(updateBookingData.missingInfoResponse);
  });

  test("Update booking with invalid token",async({apiHelper})=>{
    const response = await apiHelper.put(`booking/${bookingId}`, {
      headers: await apiHelper.getToken(updateBookingData.invalidToken),
      data: updateBookingData.validBooking,
    });
    expect(response.status()).toBe(updateBookingData.invalidTokenResponse);
  });
});

