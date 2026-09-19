import { test, request, expect, APIRequestContext } from '@playwright/test';
import { createBooking, updateBooking, BookingResponse } from '../../../../utils/booking-api';
import createBookingSchema from '../../../../schema/createbooking.schema.json';
import bookingSchema from '../../../../schema/booking.schema.json';
import { validateSchema, isCheckinPast } from '../../../../utils/common';

let bookingId: number;
let apiContext: APIRequestContext;
let createdBookingBody: BookingResponse;
let updatedBookingBody: BookingResponse;

test.beforeAll('Create API Request Context', async () => {
  apiContext = await request.newContext();
});

test.afterAll('Dispose API Request Context', async () => {
  apiContext.dispose();
});

test('Create a Booking and Validate Schema', async () => {
  const createBookingResponse = await createBooking(apiContext);
  createdBookingBody = await createBookingResponse.json();
  bookingId = createdBookingBody.bookingid!;
  expect(createBookingResponse.ok()).toBeTruthy();
  expect(createBookingResponse.status()).toBe(200);
  const isSchemValid = validateSchema(createBookingSchema, createdBookingBody);
  expect(isSchemValid).toBeTruthy();
});

test('Update Booking and Validate Schema', async () => {
  const updateBookingResponse = await updateBooking(apiContext, bookingId);
  updatedBookingBody = await updateBookingResponse.json();
  expect(updateBookingResponse.ok()).toBeTruthy();
  expect(updateBookingResponse.status()).toBe(200);
  const isSchemValid = validateSchema(bookingSchema, updatedBookingBody);
  expect(isSchemValid).toBeTruthy();
});

test('Validate Out of range BookingId', async () => {
  const response = await updateBooking(apiContext, -4389);
  expect(response.ok()).toBeFalsy();
});

test('Validate checkin date is past than checkout date', async () => {
  const checkin = Number(new Date(createdBookingBody.booking.bookingdates.checkin));
  const checkout = Number(new Date(createdBookingBody.booking.bookingdates.checkout));
  const isPast = isCheckinPast(checkin, checkout);
  expect(isPast).toBeGreaterThan(0);
});
