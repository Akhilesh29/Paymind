# paymind

a web app that helps users find and compare the best upi cashback offers across multiple payment apps and categories.

## project overview

paymind simplifies the process of discovering the highest cashback returns for different types of payments. instead of checking each upi app individually, users can select a payment category and amount, then instantly see all available offers sorted by cashback value.

the app currently supports 10 payment categories including mobile recharge, electricity, shopping, food, travel, movies, gas, water, dth, and insurance. it compares offers from 6 major upi apps: google pay, phonepe, paytm, amazon pay, cred, and bhim.

## key features

users can select from 10 different payment categories to narrow down relevant offers. quick amount buttons provide one-click selection for common payment values like 99, 199, 499, 999, and 1999 rupees.

the app automatically calculates and displays the actual cashback amount for each selection. offers are sorted by cashback value with the best deal highlighted prominently. each offer displays the offer type such as cashback, scratch card, coins, or none.

a pay now button on each offer card generates a upi deep link that works on mobile devices, allowing seamless payment processing through the user's preferred upi app.

the entire interface is fully responsive and optimized for mobile browsers, ensuring a smooth experience across all devices.

## technology stack

built with react 19 and typescript for type safety. vite provides rapid development and optimized production builds. no external ui libraries are used, keeping the codebase lightweight and highly customizable.

## setup and installation

clone or download the project from your source repository.

navigate to the project directory and install dependencies using npm:

```
npm install
```

## how to run

start the development server with hot module reloading:

```
npm run dev
```

the application will start on http://localhost:5173 by default.

to build the project for production:

```
npm run build
```

to preview the production build locally:

```
npm run preview
```

to check code quality with eslint:

```
npm run lint
```

## project structure

src/components contains reusable react components including category selector, quick amount buttons, and offer table.

src/data holds the centralized offer data with all categories, upi apps, and cashback offers.

src/app.tsx serves as the main application component managing state and filtering logic.

src/app.css contains all component-specific styling with responsive design patterns.

src/index.css provides global styles and css variables.

## future enhancements

plans include integrating a backend api to fetch live offer data from partner upi apps. user accounts will enable tracking of payment history and total cashback earned. a progressive web app implementation will allow users to install the app on their home screen like a native app.

an admin panel will be developed for managing and updating cashback offers weekly. analytics features will track popular categories and monitor user engagement with different offers.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
