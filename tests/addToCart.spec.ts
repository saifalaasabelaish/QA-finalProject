import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';

dotenv.config();


test.describe('Add to Cart', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user' ,'secret_sauce');
  });

  test('Add item to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });
});
