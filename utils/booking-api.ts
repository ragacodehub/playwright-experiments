import { expect, APIResponse, APIRequestContext, Page } from '@playwright/test';

export interface BookingResponse {
  bookingid?: number;
  booking: UpdatedBookingResponse;
  additionalneeds: string;
}

export interface UpdatedBookingResponse {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}
interface BookingDates {
  checkin: string;
  checkout: string;
}

export async function getAccessToken(apiContext: APIRequestContext): Promise<string> {
  const response = await apiContext.post('/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
  });
  expect(response.ok()).toBeTruthy();
  if (response.status() !== 200) {
    console.error(`Failed to retrieve auth token ${await response.json()}`);
  }
  const responseBody = await response.json();
  return await responseBody.token;
}

export async function createBooking(apiContext: APIRequestContext): Promise<APIResponse> {
  const response = await apiContext.post('/booking', {
    data: {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    },
  });
  return response;
}

export async function updateBooking(
  apiContext: APIRequestContext,
  bookingId: number
): Promise<APIResponse> {
  const token = await getAccessToken(apiContext);
  const response = await apiContext.put(`booking/${bookingId}`, {
    headers: {
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    data: {
      firstname: 'James',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    },
  });
  return response;
}

//API mocking
export async function mockAPI(page: Page) {
  await page.route('**/inventory.html', async (route) => {
    await route.fulfill({
      status: 500,
      body: JSON.stringify({
        error: 'Something went wrong',
      }),
    });
  });
}
