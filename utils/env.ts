import dotenv from 'dotenv';

const envFile = process.env.ENV_FILE || '.env.main';
dotenv.config({ path: envFile });

export const env = {
  baseUrl: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
  apiUrl: process.env.API_URL || 'https://api.practicesoftwaretesting.com',
  userEmail: process.env.USER_EMAIL || 'customer@practicesoftwaretesting.com',
  userPassword: process.env.USER_PASSWORD || 'welcome01',
  invalidEmail: process.env.INVALID_EMAIL || 'wrong@example.com',
  invalidPassword: process.env.INVALID_PASSWORD || 'wrongpass123'
};