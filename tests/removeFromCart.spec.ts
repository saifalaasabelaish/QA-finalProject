import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';

dotenv.config();


test.describe('Remove from Cart', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user' ,'secret_sauce');
  });

  test('Remove item from cart', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await page.goto('/inventory.html');
  await inventory.addItemToCart('Sauce Labs Bike Light');
  await inventory.removeItemFromCart('Sauce Labs Bike Light');
  await inventory.goToCart();

  const itemInCart = page.locator('.cart_item:has-text("Sauce Labs Bike Light")');
  await expect(itemInCart).toHaveCount(0); // item should not exist
});

});
