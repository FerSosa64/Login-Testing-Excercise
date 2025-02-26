import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('f');
  await page.locator('input[type="text"]').press('CapsLock');
  await page.locator('input[type="text"]').fill('Fernando');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('fer64@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('1234');
  await page.locator('form').getByRole('button', { name: 'Sign Up' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('fer64@gmail.com');
  await page.locator('div').filter({ hasText: /^Password:$/ }).click();
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('1234');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('img', { name: 'open' }).click();
});