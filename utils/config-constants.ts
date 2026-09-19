import { environments } from '../environment/environment';

export function getBaseURL() {
  const env: string = process.env.ENV ?? 'SAUCEDEMO';

  if (!env || !environments[env]) {
    throw new Error(`Invalid or missing environment: ${env}`);
  }

  return environments[env].baseUrl;
}
