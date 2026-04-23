import { test, expect } from '@playwright/test';
import { env } from '../../utils/env';

test.describe('API - Auth', () => {
  test('POST /users/login rejects invalid credentials', async ({ request }) => {
    const response = await request.post(`${env.apiUrl}/users/login`, {
      data: {
        email: env.invalidEmail,
        password: env.invalidPassword
      }
    });

    expect(response.ok()).toBeFalsy();
  });

  test('POST /users/login accepts valid credentials', async ({ request }) => {
    const response = await request.post(`${env.apiUrl}/users/login`, {
      data: {
        email: env.userEmail,
        password: env.userPassword
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toBeTruthy();

    // keep this flexible because token field names can vary
    expect(JSON.stringify(body).toLowerCase()).toContain('token');
  });
});