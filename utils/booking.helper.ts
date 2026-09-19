import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiHelper {
  readonly apiContext: APIRequestContext;
  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async get(resource: string): Promise<APIResponse> {
    return await this.apiContext.get(`/${resource}`);
  }

  async post(
    resource: string,
    options?: { header?: Record<string, string>; data?: object }
  ): Promise<APIResponse> {
    return await this.apiContext.post(`/${resource}`, options);
  }

  async put(
    resource: string,
    options?: { headers?: Record<string, string>; data?: object }
  ): Promise<APIResponse> {
    return await this.apiContext.put(`/${resource}`, options);
  }

  async getById(Id: number): Promise<APIResponse> {
    return await this.apiContext.get(`/booking/${Id}`);
  }

  async getToken(token: string): Promise<Record<string, string>> {
    return {
      Cookie: `token=${token}`,
    };
  }
}

