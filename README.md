# E-Commerce Testing Suite with Playwright

A comprehensive end-to-end testing suite for an e-commerce web application built with **Playwright** and **TypeScript**. This project demonstrates best practices for automated testing using the Page Object Model pattern.

## 🚀 Overview

This testing suite covers the complete user journey of an e-commerce application, including:
- User authentication and login
- Product catalog browsing and sorting
- Shopping cart management
- Complete checkout flow

## 🛠️ Tech Stack

- **Playwright** - Modern end-to-end testing framework
- **TypeScript** - Type-safe JavaScript for better development experience
- **Node.js** - Runtime environment
- **dotenv** - Environment variable management

## 📁 Project Structure

```
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts       # Login page interactions
│   ├── InventoryPage.ts   # Product catalog page
│   ├── CartPage.ts        # Shopping cart page
│   └── CheckoutPage.ts    # Checkout process page
├── tests/                 # Test specification files
│   ├── login.spec.ts      # Authentication tests
│   ├── addToCart.spec.ts  # Add to cart functionality
│   ├── removeFromCart.spec.ts # Remove from cart tests
│   ├── sort.spec.ts       # Product sorting tests
│   └── checkout.spec.ts   # End-to-end checkout flow
```

## 🎯 Test Coverage

### Authentication
- ✅ Successful login with valid credentials
- ✅ Proper redirect to inventory page after login

### Product Management
- ✅ Add items to shopping cart
- ✅ Remove items from shopping cart
- ✅ Sort products by name (A-Z)
- ✅ Sort products by price (High to Low)

### Checkout Flow
- ✅ Complete end-to-end purchase process
- ✅ Form validation and submission
- ✅ Order confirmation verification

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saifalaasabelaish/QA-finalProject
   cd QA-finalProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   touch .env
   
   # Add any required environment variables
   URL=https://www.saucedemo.com
   USERNAME=standard_user
   PASSWORD=secret_sauce
   ```

### Running Tests

**Run all tests**
```bash
npx playwright test
```

**Run specific test file**
```bash
npx playwright test login.spec.ts
```

**Run tests in headed mode (visible browser)**
```bash
npx playwright test --headed
```

**Run tests with UI mode**
```bash
npx playwright test --ui
```

**Generate test report**
```bash
npx playwright show-report
```

## 📋 Test Scenarios

### Login Tests (`login.spec.ts`)
Tests user authentication functionality with standard credentials.

### Add to Cart Tests (`addToCart.spec.ts`)
Verifies users can successfully add products to their shopping cart and see them reflected in the cart page.

### Remove from Cart Tests (`removeFromCart.spec.ts`)
Ensures users can remove items from their cart and that the items are properly removed from the cart view.

### Sorting Tests (`sort.spec.ts`)
Tests product sorting functionality:
- **A-Z sorting**: Verifies alphabetical ordering
- **Price sorting**: Validates high-to-low price arrangement

### Checkout Tests (`checkout.spec.ts`)
Complete end-to-end purchase flow:
1. Add product to cart
2. Navigate to cart
3. Proceed to checkout
4. Fill customer information
5. Complete purchase
6. Verify order confirmation

## 🏗️ Architecture

### Page Object Model
This project implements the **Page Object Model (POM)** pattern, which provides:

- **Maintainability**: Centralized element selectors and page interactions
- **Reusability**: Methods can be shared across multiple test files
- **Readability**: Clean separation between test logic and page interactions
- **Scalability**: Easy to add new pages and functionality

### Key Classes

**LoginPage**
- Handles user authentication
- Manages navigation to login page
- Provides login method with credentials

**InventoryPage**
- Manages product catalog interactions
- Handles cart operations (add/remove items)
- Implements robust sorting functionality with fallback strategies
- Provides data extraction methods for verification

**CartPage**
- Manages shopping cart navigation
- Handles checkout initiation

**CheckoutPage**
- Manages customer information form
- Handles order completion
- Provides confirmation text extraction

## 🔧 Configuration

### Browser Configuration
Tests run on multiple browsers by default. Modify `playwright.config.ts` to customize:
- Browser selection (Chromium, Firefox, Safari)
- Viewport settings
- Test timeout values
- Screenshot and video recording options

### Environment Variables
Create a `.env` file to manage environment-specific configurations:
```env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
```

## 🧪 Test Data

The tests use the following test credentials:
- **Username**: `standard_user`
- **Password**: `secret_sauce`

Test products include:
- Sauce Labs Backpack
- Sauce Labs Fleece Jacket  
- Sauce Labs Bike Light


Access reports with:
```bash
npx playwright show-report
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Commit your changes (`git commit -am 'Add new test scenario'`)
4. Push to the branch (`git push origin feature/new-test`)
5. Create a Pull Request

## 📚 Best Practices Implemented

- **Explicit Waits**: Using `waitFor()` and `waitForSelector()` for reliable element interactions
- **Error Handling**: Graceful fallbacks for element selection
- **Type Safety**: Full TypeScript implementation for better development experience
- **Test Isolation**: Each test starts with a clean state using `beforeEach`
- **Descriptive Assertions**: Clear expectations with meaningful error messages
- **Logging**: Console output for debugging complex interactions

## 🐛 Troubleshooting

**Common Issues:**

1. **Tests timing out**
   - Increase timeout values in `playwright.config.ts`
   - Check network connectivity to test application

2. **Element not found errors**
   - Verify application is running and accessible
   - Check if element selectors have changed

3. **Login failures**
   - Verify test credentials are correct
   - Check if application login flow has changed


**Happy Testing! 🎉**
