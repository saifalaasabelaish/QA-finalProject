import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    await this.page.click(`text=${itemName} >> xpath=../../.. >> text=Add to cart`);
  }

  async removeItemFromCart(itemName: string) {
    await this.page.click(`text=${itemName} >> xpath=../../.. >> text=Remove`);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async sortBy(optionValue: string) {
  const dropdown = this.page.locator('[data-test="product_sort_container"]');
  const count = await dropdown.count();
  console.log(`Dropdown elements found with [data-test]: ${count}`);

  if (count === 0) {
    console.warn('Dropdown with [data-test="product_sort_container"] not found, trying simpler selector...');
    const altDropdown = this.page.locator('select');
    const altCount = await altDropdown.count();
    console.log(`Dropdown elements found with 'select': ${altCount}`);
    if (altCount === 0) throw new Error('No sort dropdown found on page');
    await altDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await expect(altDropdown).toBeEnabled({ timeout: 5000 });
    await altDropdown.selectOption(optionValue);
  } else {
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dropdown).toBeEnabled({ timeout: 5000 });
    await dropdown.selectOption(optionValue);
  }

  await this.page.waitForTimeout(500);
}


  async getFirstItemName(): Promise<string | null> {
    await this.page.waitForSelector('.inventory_item_name', { state: 'visible' });
    return await this.page.locator('.inventory_item_name').first().textContent();
  }

  async getItemPrices(): Promise<number[]> {
    await this.page.waitForSelector('.inventory_item_price', { state: 'visible' });

    return await this.page.$$eval('.inventory_item_price', nodes =>
      nodes.map(n => parseFloat(n.textContent!.replace('$', '')))
    );
  }
}
