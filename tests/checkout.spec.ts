import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import dotenv from 'dotenv';

dotenv.config();


test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user' ,'secret_sauce');
  });

  test('Complete checkout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCart('Sauce Labs Fleece Jacket');
    await inventory.goToCart();

    const cart = new CartPage(page);
    await cart.proceedToCheckout();

    const checkout = new CheckoutPage(page);
    await checkout.fillForm('John', 'Doe', '12345');
    await checkout.finish();

    await expect(await checkout.getConfirmationText()).toContain('Thank you for your order!');

  });
});
