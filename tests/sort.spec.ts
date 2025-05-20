import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Sort Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    
    await page.waitForURL(/inventory/);
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('.inventory_container')).toBeVisible();
  });

  test('Sort A to Z', async ({ page }) => {
    const inventory = new InventoryPage(page);
    console.log('Starting Sort A to Z test');
    await inventory.sortBy('az');
    const item = await inventory.getFirstItemName();
    console.log(`First item after sorting: ${item}`);
    expect(item?.toLowerCase()).toMatch(/^a|^s/i);
  });

  test('Sort Price: High to Low', async ({ page }) => {
    const inventory = new InventoryPage(page);
    console.log('Starting Sort Price: High to Low test');
    await inventory.sortBy('hilo');
    const prices = await inventory.getItemPrices();
    console.log(`Prices after sorting: ${prices.join(', ')}`);
    expect(prices[0]).toBeGreaterThanOrEqual(prices[1]);
  });
});
