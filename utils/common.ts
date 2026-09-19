import Ajv, { Schema } from 'ajv';
import { BookingResponse } from './booking-api';

export function validateSchema(schema: Schema, response: BookingResponse): boolean {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(response);
  return valid;
}

export function isCheckinPast(checkin: number, checkout: number): number {
  const isPast = checkout - checkin;
  return isPast;
}
