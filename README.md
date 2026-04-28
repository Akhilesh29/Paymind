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

built with react 19 and typescript for type safety. 

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

