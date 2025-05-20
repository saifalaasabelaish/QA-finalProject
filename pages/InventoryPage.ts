// // InventoryPage.ts
// import { Page } from '@playwright/test';

// export class InventoryPage {
//   constructor(private page: Page) {}

//   async addItemToCart(itemName: string) {
//     await this.page.click(`text=${itemName} >> xpath=../../.. >> text=Add to cart`);
//   }

//   async removeItemFromCart(itemName: string) {
//     await this.page.click(`text=${itemName} >> xpath=../../.. >> text=Remove`);
//   }

//   async goToCart() {
//     await this.page.click('.shopping_cart_link');
//   }

//   async sortBy(optionValue: string) {
//     // Wait for page to be fully loaded before trying to select options
//     await this.page.waitForLoadState('networkidle');
    
//     // Wait for the sort dropdown to be visible
//     await this.page.waitForSelector('[data-test="product_sort_container"]', { 
//       state: 'visible',
//       timeout: 10000 
//     });
    
//     // Use selectOption with the specific option value
//     await this.page.selectOption('[data-test="product_sort_container"]', optionValue);
    
//     // Small delay to let the sorting take effect
//     await this.page.waitForTimeout(500);
//   }

//   async getFirstItemName(): Promise<string | null> {
//     // Wait for the inventory items to be visible after sorting
//     await this.page.waitForSelector('.inventory_item_name', { state: 'visible' });
//     return await this.page.locator('.inventory_item_name').first().textContent();
//   }
  
//   // Add a method to get prices for the high-to-low test
//   async getItemPrices(): Promise<number[]> {
//     await this.page.waitForSelector('.inventory_item_price', { state: 'visible' });
//     return await this.page.$$eval('.inventory_item_price', nodes =>
//       nodes.map(n => parseFloat(n.textContent!.replace('$', '')))
//     );
//   }
// }
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
