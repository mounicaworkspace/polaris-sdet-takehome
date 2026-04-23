import { test, expect } from '@playwright/test';
import { env } from '../../utils/env';

test.describe('API - Products', () => {
  test('GET /products returns product list', async ({ request }) => {
    const response = await request.get(`${env.apiUrl}/products`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    // API may return either { data: [...] } or an array
    const products = Array.isArray(body) ? body : body.data;
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);

    const first = products[0];
    expect(first).toBeTruthy();
  });
});