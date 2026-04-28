export type Category = {
  id: string;
  name: string;
  icon: string; // URL or import path for category icon
};

export type UpiApp = {
  id: string;
  name: string;
  deepLinkPrefix: string; // e.g., 'gpay://', will be used to construct deep link
};

export type Offer = {
  categoryId: string;
  appId: string;
  amount: number; // transaction amount in rupees
  cashback: number; // cashback amount in rupees
  type: 'Cashback' | 'Scratch Card' | 'Coins' | 'None';
};

export const categories: Category[] = [
  { id: 'mobile', name: 'Mobile Recharge', icon: '/icons/mobile.svg' },
  { id: 'electricity', name: 'Electricity', icon: '/assets/electricity.svg' },
  { id: 'shopping', name: 'Shopping', icon: '/assets/shopping.svg' },
  { id: 'food', name: 'Food', icon: '/assets/food.svg' },
  { id: 'travel', name: 'Travel', icon: '/assets/travel.svg' },
  { id: 'movies', name: 'Movies', icon: '/assets/movies.svg' },
  { id: 'gas', name: 'Gas', icon: '/assets/gas.svg' },
  { id: 'water', name: 'Water', icon: '/assets/water.svg' },
  { id: 'dth', name: 'DTH', icon: '/assets/dth.svg' },
  { id: 'insurance', name: 'Insurance', icon: '/assets/insurance.svg' },
];

export const upiApps: UpiApp[] = [
  { id: 'gpay', name: 'GPay', deepLinkPrefix: 'https://pay.google.com/gp/p/' },
  { id: 'phonepe', name: 'PhonePe', deepLinkPrefix: 'https://www.phonepe.com/pay/' },
  { id: 'paytm', name: 'Paytm', deepLinkPrefix: 'paytmmp://pay?' },
  { id: 'amazon', name: 'Amazon Pay', deepLinkPrefix: 'amazon://pay?' },
  { id: 'cred', name: 'CRED', deepLinkPrefix: 'cred://pay?' },
  { id: 'bhim', name: 'BHIM', deepLinkPrefix: 'bhim://pay?' },
];

// Sample offers – in a real product these would be fetched from a backend.
export const offers: Offer[] = [
  // Mobile Recharge
  { categoryId: 'mobile', appId: 'gpay', amount: 99, cashback: 5, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'phonepe', amount: 99, cashback: 6, type: 'Scratch Card' },
  { categoryId: 'mobile', appId: 'paytm', amount: 99, cashback: 10, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'amazon', amount: 99, cashback: 4, type: 'Coins' },
  { categoryId: 'mobile', appId: 'cred', amount: 99, cashback: 3, type: 'None' },
  { categoryId: 'mobile', appId: 'bhim', amount: 99, cashback: 2, type: 'Cashback' },
  
  { categoryId: 'mobile', appId: 'gpay', amount: 199, cashback: 10, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'phonepe', amount: 199, cashback: 12, type: 'Scratch Card' },
  { categoryId: 'mobile', appId: 'paytm', amount: 199, cashback: 20, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'amazon', amount: 199, cashback: 8, type: 'Coins' },
  { categoryId: 'mobile', appId: 'cred', amount: 199, cashback: 6, type: 'None' },
  { categoryId: 'mobile', appId: 'bhim', amount: 199, cashback: 5, type: 'Cashback' },

  { categoryId: 'mobile', appId: 'gpay', amount: 499, cashback: 24, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'phonepe', amount: 499, cashback: 30, type: 'Scratch Card' },
  { categoryId: 'mobile', appId: 'paytm', amount: 499, cashback: 49, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'amazon', amount: 499, cashback: 20, type: 'Coins' },
  { categoryId: 'mobile', appId: 'cred', amount: 499, cashback: 15, type: 'None' },
  { categoryId: 'mobile', appId: 'bhim', amount: 499, cashback: 10, type: 'Cashback' },

  { categoryId: 'mobile', appId: 'gpay', amount: 999, cashback: 50, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'phonepe', amount: 999, cashback: 60, type: 'Scratch Card' },
  { categoryId: 'mobile', appId: 'paytm', amount: 999, cashback: 99, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'amazon', amount: 999, cashback: 40, type: 'Coins' },
  { categoryId: 'mobile', appId: 'cred', amount: 999, cashback: 30, type: 'None' },
  { categoryId: 'mobile', appId: 'bhim', amount: 999, cashback: 20, type: 'Cashback' },

  { categoryId: 'mobile', appId: 'gpay', amount: 1999, cashback: 100, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'phonepe', amount: 1999, cashback: 120, type: 'Scratch Card' },
  { categoryId: 'mobile', appId: 'paytm', amount: 1999, cashback: 199, type: 'Cashback' },
  { categoryId: 'mobile', appId: 'amazon', amount: 1999, cashback: 80, type: 'Coins' },
  { categoryId: 'mobile', appId: 'cred', amount: 1999, cashback: 60, type: 'None' },
  { categoryId: 'mobile', appId: 'bhim', amount: 1999, cashback: 40, type: 'Cashback' },

  // Electricity
  { categoryId: 'electricity', appId: 'gpay', amount: 99, cashback: 4, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'phonepe', amount: 99, cashback: 5, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'paytm', amount: 99, cashback: 8, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'amazon', amount: 99, cashback: 3, type: 'Coins' },
  { categoryId: 'electricity', appId: 'cred', amount: 99, cashback: 2, type: 'None' },
  { categoryId: 'electricity', appId: 'bhim', amount: 99, cashback: 1, type: 'Cashback' },

  { categoryId: 'electricity', appId: 'gpay', amount: 499, cashback: 20, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'phonepe', amount: 499, cashback: 25, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'paytm', amount: 499, cashback: 40, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'amazon', amount: 499, cashback: 15, type: 'Coins' },
  { categoryId: 'electricity', appId: 'cred', amount: 499, cashback: 10, type: 'None' },
  { categoryId: 'electricity', appId: 'bhim', amount: 499, cashback: 8, type: 'Cashback' },

  { categoryId: 'electricity', appId: 'gpay', amount: 999, cashback: 40, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'phonepe', amount: 999, cashback: 50, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'paytm', amount: 999, cashback: 80, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'amazon', amount: 999, cashback: 30, type: 'Coins' },
  { categoryId: 'electricity', appId: 'cred', amount: 999, cashback: 20, type: 'None' },
  { categoryId: 'electricity', appId: 'bhim', amount: 999, cashback: 16, type: 'Cashback' },

  { categoryId: 'electricity', appId: 'gpay', amount: 1999, cashback: 80, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'phonepe', amount: 1999, cashback: 100, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'paytm', amount: 1999, cashback: 160, type: 'Cashback' },
  { categoryId: 'electricity', appId: 'amazon', amount: 1999, cashback: 60, type: 'Coins' },
  { categoryId: 'electricity', appId: 'cred', amount: 1999, cashback: 40, type: 'None' },
  { categoryId: 'electricity', appId: 'bhim', amount: 1999, cashback: 32, type: 'Cashback' },

  // Shopping
  { categoryId: 'shopping', appId: 'gpay', amount: 99, cashback: 7, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'phonepe', amount: 99, cashback: 9, type: 'Scratch Card' },
  { categoryId: 'shopping', appId: 'paytm', amount: 99, cashback: 12, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'amazon', amount: 99, cashback: 15, type: 'Coins' },
  { categoryId: 'shopping', appId: 'cred', amount: 99, cashback: 5, type: 'None' },
  { categoryId: 'shopping', appId: 'bhim', amount: 99, cashback: 3, type: 'Cashback' },

  { categoryId: 'shopping', appId: 'gpay', amount: 499, cashback: 35, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'phonepe', amount: 499, cashback: 45, type: 'Scratch Card' },
  { categoryId: 'shopping', appId: 'paytm', amount: 499, cashback: 60, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'amazon', amount: 499, cashback: 75, type: 'Coins' },
  { categoryId: 'shopping', appId: 'cred', amount: 499, cashback: 25, type: 'None' },
  { categoryId: 'shopping', appId: 'bhim', amount: 499, cashback: 15, type: 'Cashback' },

  { categoryId: 'shopping', appId: 'gpay', amount: 999, cashback: 70, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'phonepe', amount: 999, cashback: 90, type: 'Scratch Card' },
  { categoryId: 'shopping', appId: 'paytm', amount: 999, cashback: 120, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'amazon', amount: 999, cashback: 150, type: 'Coins' },
  { categoryId: 'shopping', appId: 'cred', amount: 999, cashback: 50, type: 'None' },
  { categoryId: 'shopping', appId: 'bhim', amount: 999, cashback: 30, type: 'Cashback' },

  { categoryId: 'shopping', appId: 'gpay', amount: 1999, cashback: 140, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'phonepe', amount: 1999, cashback: 180, type: 'Scratch Card' },
  { categoryId: 'shopping', appId: 'paytm', amount: 1999, cashback: 240, type: 'Cashback' },
  { categoryId: 'shopping', appId: 'amazon', amount: 1999, cashback: 300, type: 'Coins' },
  { categoryId: 'shopping', appId: 'cred', amount: 1999, cashback: 100, type: 'None' },
  { categoryId: 'shopping', appId: 'bhim', amount: 1999, cashback: 60, type: 'Cashback' },

  // Food
  { categoryId: 'food', appId: 'gpay', amount: 99, cashback: 8, type: 'Cashback' },
  { categoryId: 'food', appId: 'phonepe', amount: 99, cashback: 10, type: 'Scratch Card' },
  { categoryId: 'food', appId: 'paytm', amount: 99, cashback: 15, type: 'Cashback' },
  { categoryId: 'food', appId: 'amazon', amount: 99, cashback: 12, type: 'Coins' },
  { categoryId: 'food', appId: 'cred', amount: 99, cashback: 8, type: 'None' },
  { categoryId: 'food', appId: 'bhim', amount: 99, cashback: 5, type: 'Cashback' },

  { categoryId: 'food', appId: 'gpay', amount: 499, cashback: 40, type: 'Cashback' },
  { categoryId: 'food', appId: 'phonepe', amount: 499, cashback: 50, type: 'Scratch Card' },
  { categoryId: 'food', appId: 'paytm', amount: 499, cashback: 75, type: 'Cashback' },
  { categoryId: 'food', appId: 'amazon', amount: 499, cashback: 60, type: 'Coins' },
  { categoryId: 'food', appId: 'cred', amount: 499, cashback: 40, type: 'None' },
  { categoryId: 'food', appId: 'bhim', amount: 499, cashback: 25, type: 'Cashback' },

  { categoryId: 'food', appId: 'gpay', amount: 999, cashback: 80, type: 'Cashback' },
  { categoryId: 'food', appId: 'phonepe', amount: 999, cashback: 100, type: 'Scratch Card' },
  { categoryId: 'food', appId: 'paytm', amount: 999, cashback: 150, type: 'Cashback' },
  { categoryId: 'food', appId: 'amazon', amount: 999, cashback: 120, type: 'Coins' },
  { categoryId: 'food', appId: 'cred', amount: 999, cashback: 80, type: 'None' },
  { categoryId: 'food', appId: 'bhim', amount: 999, cashback: 50, type: 'Cashback' },

  { categoryId: 'food', appId: 'gpay', amount: 1999, cashback: 160, type: 'Cashback' },
  { categoryId: 'food', appId: 'phonepe', amount: 1999, cashback: 200, type: 'Scratch Card' },
  { categoryId: 'food', appId: 'paytm', amount: 1999, cashback: 300, type: 'Cashback' },
  { categoryId: 'food', appId: 'amazon', amount: 1999, cashback: 240, type: 'Coins' },
  { categoryId: 'food', appId: 'cred', amount: 1999, cashback: 160, type: 'None' },
  { categoryId: 'food', appId: 'bhim', amount: 1999, cashback: 100, type: 'Cashback' },

  // Travel
  { categoryId: 'travel', appId: 'gpay', amount: 99, cashback: 6, type: 'Cashback' },
  { categoryId: 'travel', appId: 'phonepe', amount: 99, cashback: 8, type: 'Cashback' },
  { categoryId: 'travel', appId: 'paytm', amount: 99, cashback: 12, type: 'Cashback' },
  { categoryId: 'travel', appId: 'amazon', amount: 99, cashback: 5, type: 'Coins' },
  { categoryId: 'travel', appId: 'cred', amount: 99, cashback: 3, type: 'None' },
  { categoryId: 'travel', appId: 'bhim', amount: 99, cashback: 2, type: 'Cashback' },

  { categoryId: 'travel', appId: 'gpay', amount: 499, cashback: 30, type: 'Cashback' },
  { categoryId: 'travel', appId: 'phonepe', amount: 499, cashback: 40, type: 'Cashback' },
  { categoryId: 'travel', appId: 'paytm', amount: 499, cashback: 60, type: 'Cashback' },
  { categoryId: 'travel', appId: 'amazon', amount: 499, cashback: 25, type: 'Coins' },
  { categoryId: 'travel', appId: 'cred', amount: 499, cashback: 15, type: 'None' },
  { categoryId: 'travel', appId: 'bhim', amount: 499, cashback: 10, type: 'Cashback' },

  { categoryId: 'travel', appId: 'gpay', amount: 999, cashback: 60, type: 'Cashback' },
  { categoryId: 'travel', appId: 'phonepe', amount: 999, cashback: 80, type: 'Cashback' },
  { categoryId: 'travel', appId: 'paytm', amount: 999, cashback: 120, type: 'Cashback' },
  { categoryId: 'travel', appId: 'amazon', amount: 999, cashback: 50, type: 'Coins' },
  { categoryId: 'travel', appId: 'cred', amount: 999, cashback: 30, type: 'None' },
  { categoryId: 'travel', appId: 'bhim', amount: 999, cashback: 20, type: 'Cashback' },

  { categoryId: 'travel', appId: 'gpay', amount: 1999, cashback: 120, type: 'Cashback' },
  { categoryId: 'travel', appId: 'phonepe', amount: 1999, cashback: 160, type: 'Cashback' },
  { categoryId: 'travel', appId: 'paytm', amount: 1999, cashback: 240, type: 'Cashback' },
  { categoryId: 'travel', appId: 'amazon', amount: 1999, cashback: 100, type: 'Coins' },
  { categoryId: 'travel', appId: 'cred', amount: 1999, cashback: 60, type: 'None' },
  { categoryId: 'travel', appId: 'bhim', amount: 1999, cashback: 40, type: 'Cashback' },

  // Movies
  { categoryId: 'movies', appId: 'gpay', amount: 99, cashback: 5, type: 'Scratch Card' },
  { categoryId: 'movies', appId: 'phonepe', amount: 99, cashback: 7, type: 'Cashback' },
  { categoryId: 'movies', appId: 'paytm', amount: 99, cashback: 10, type: 'Cashback' },
  { categoryId: 'movies', appId: 'amazon', amount: 99, cashback: 8, type: 'Coins' },
  { categoryId: 'movies', appId: 'cred', amount: 99, cashback: 5, type: 'None' },
  { categoryId: 'movies', appId: 'bhim', amount: 99, cashback: 3, type: 'Cashback' },

  { categoryId: 'movies', appId: 'gpay', amount: 499, cashback: 25, type: 'Scratch Card' },
  { categoryId: 'movies', appId: 'phonepe', amount: 499, cashback: 35, type: 'Cashback' },
  { categoryId: 'movies', appId: 'paytm', amount: 499, cashback: 50, type: 'Cashback' },
  { categoryId: 'movies', appId: 'amazon', amount: 499, cashback: 40, type: 'Coins' },
  { categoryId: 'movies', appId: 'cred', amount: 499, cashback: 25, type: 'None' },
  { categoryId: 'movies', appId: 'bhim', amount: 499, cashback: 15, type: 'Cashback' },

  { categoryId: 'movies', appId: 'gpay', amount: 999, cashback: 50, type: 'Scratch Card' },
  { categoryId: 'movies', appId: 'phonepe', amount: 999, cashback: 70, type: 'Cashback' },
  { categoryId: 'movies', appId: 'paytm', amount: 999, cashback: 100, type: 'Cashback' },
  { categoryId: 'movies', appId: 'amazon', amount: 999, cashback: 80, type: 'Coins' },
  { categoryId: 'movies', appId: 'cred', amount: 999, cashback: 50, type: 'None' },
  { categoryId: 'movies', appId: 'bhim', amount: 999, cashback: 30, type: 'Cashback' },

  { categoryId: 'movies', appId: 'gpay', amount: 1999, cashback: 100, type: 'Scratch Card' },
  { categoryId: 'movies', appId: 'phonepe', amount: 1999, cashback: 140, type: 'Cashback' },
  { categoryId: 'movies', appId: 'paytm', amount: 1999, cashback: 200, type: 'Cashback' },
  { categoryId: 'movies', appId: 'amazon', amount: 1999, cashback: 160, type: 'Coins' },
  { categoryId: 'movies', appId: 'cred', amount: 1999, cashback: 100, type: 'None' },
  { categoryId: 'movies', appId: 'bhim', amount: 1999, cashback: 60, type: 'Cashback' },

  // Gas
  { categoryId: 'gas', appId: 'gpay', amount: 99, cashback: 3, type: 'Cashback' },
  { categoryId: 'gas', appId: 'phonepe', amount: 99, cashback: 4, type: 'Cashback' },
  { categoryId: 'gas', appId: 'paytm', amount: 99, cashback: 6, type: 'Cashback' },
  { categoryId: 'gas', appId: 'amazon', amount: 99, cashback: 2, type: 'Coins' },
  { categoryId: 'gas', appId: 'cred', amount: 99, cashback: 1, type: 'None' },
  { categoryId: 'gas', appId: 'bhim', amount: 99, cashback: 1, type: 'Cashback' },

  { categoryId: 'gas', appId: 'gpay', amount: 499, cashback: 15, type: 'Cashback' },
  { categoryId: 'gas', appId: 'phonepe', amount: 499, cashback: 20, type: 'Cashback' },
  { categoryId: 'gas', appId: 'paytm', amount: 499, cashback: 30, type: 'Cashback' },
  { categoryId: 'gas', appId: 'amazon', amount: 499, cashback: 10, type: 'Coins' },
  { categoryId: 'gas', appId: 'cred', amount: 499, cashback: 8, type: 'None' },
  { categoryId: 'gas', appId: 'bhim', amount: 499, cashback: 5, type: 'Cashback' },

  { categoryId: 'gas', appId: 'gpay', amount: 999, cashback: 30, type: 'Cashback' },
  { categoryId: 'gas', appId: 'phonepe', amount: 999, cashback: 40, type: 'Cashback' },
  { categoryId: 'gas', appId: 'paytm', amount: 999, cashback: 60, type: 'Cashback' },
  { categoryId: 'gas', appId: 'amazon', amount: 999, cashback: 20, type: 'Coins' },
  { categoryId: 'gas', appId: 'cred', amount: 999, cashback: 16, type: 'None' },
  { categoryId: 'gas', appId: 'bhim', amount: 999, cashback: 10, type: 'Cashback' },

  { categoryId: 'gas', appId: 'gpay', amount: 1999, cashback: 60, type: 'Cashback' },
  { categoryId: 'gas', appId: 'phonepe', amount: 1999, cashback: 80, type: 'Cashback' },
  { categoryId: 'gas', appId: 'paytm', amount: 1999, cashback: 120, type: 'Cashback' },
  { categoryId: 'gas', appId: 'amazon', amount: 1999, cashback: 40, type: 'Coins' },
  { categoryId: 'gas', appId: 'cred', amount: 1999, cashback: 32, type: 'None' },
  { categoryId: 'gas', appId: 'bhim', amount: 1999, cashback: 20, type: 'Cashback' },

  // Water
  { categoryId: 'water', appId: 'gpay', amount: 99, cashback: 2, type: 'Cashback' },
  { categoryId: 'water', appId: 'phonepe', amount: 99, cashback: 3, type: 'Cashback' },
  { categoryId: 'water', appId: 'paytm', amount: 99, cashback: 5, type: 'Cashback' },
  { categoryId: 'water', appId: 'amazon', amount: 99, cashback: 2, type: 'Coins' },
  { categoryId: 'water', appId: 'cred', amount: 99, cashback: 1, type: 'None' },
  { categoryId: 'water', appId: 'bhim', amount: 99, cashback: 1, type: 'Cashback' },

  { categoryId: 'water', appId: 'gpay', amount: 499, cashback: 10, type: 'Cashback' },
  { categoryId: 'water', appId: 'phonepe', amount: 499, cashback: 15, type: 'Cashback' },
  { categoryId: 'water', appId: 'paytm', amount: 499, cashback: 25, type: 'Cashback' },
  { categoryId: 'water', appId: 'amazon', amount: 499, cashback: 10, type: 'Coins' },
  { categoryId: 'water', appId: 'cred', amount: 499, cashback: 5, type: 'None' },
  { categoryId: 'water', appId: 'bhim', amount: 499, cashback: 5, type: 'Cashback' },

  { categoryId: 'water', appId: 'gpay', amount: 999, cashback: 20, type: 'Cashback' },
  { categoryId: 'water', appId: 'phonepe', amount: 999, cashback: 30, type: 'Cashback' },
  { categoryId: 'water', appId: 'paytm', amount: 999, cashback: 50, type: 'Cashback' },
  { categoryId: 'water', appId: 'amazon', amount: 999, cashback: 20, type: 'Coins' },
  { categoryId: 'water', appId: 'cred', amount: 999, cashback: 10, type: 'None' },
  { categoryId: 'water', appId: 'bhim', amount: 999, cashback: 10, type: 'Cashback' },

  { categoryId: 'water', appId: 'gpay', amount: 1999, cashback: 40, type: 'Cashback' },
  { categoryId: 'water', appId: 'phonepe', amount: 1999, cashback: 60, type: 'Cashback' },
  { categoryId: 'water', appId: 'paytm', amount: 1999, cashback: 100, type: 'Cashback' },
  { categoryId: 'water', appId: 'amazon', amount: 1999, cashback: 40, type: 'Coins' },
  { categoryId: 'water', appId: 'cred', amount: 1999, cashback: 20, type: 'None' },
  { categoryId: 'water', appId: 'bhim', amount: 1999, cashback: 20, type: 'Cashback' },

  // DTH
  { categoryId: 'dth', appId: 'gpay', amount: 99, cashback: 5, type: 'Cashback' },
  { categoryId: 'dth', appId: 'phonepe', amount: 99, cashback: 6, type: 'Cashback' },
  { categoryId: 'dth', appId: 'paytm', amount: 99, cashback: 9, type: 'Cashback' },
  { categoryId: 'dth', appId: 'amazon', amount: 99, cashback: 4, type: 'Coins' },
  { categoryId: 'dth', appId: 'cred', amount: 99, cashback: 2, type: 'None' },
  { categoryId: 'dth', appId: 'bhim', amount: 99, cashback: 2, type: 'Cashback' },

  { categoryId: 'dth', appId: 'gpay', amount: 499, cashback: 25, type: 'Cashback' },
  { categoryId: 'dth', appId: 'phonepe', amount: 499, cashback: 30, type: 'Cashback' },
  { categoryId: 'dth', appId: 'paytm', amount: 499, cashback: 45, type: 'Cashback' },
  { categoryId: 'dth', appId: 'amazon', amount: 499, cashback: 20, type: 'Coins' },
  { categoryId: 'dth', appId: 'cred', amount: 499, cashback: 10, type: 'None' },
  { categoryId: 'dth', appId: 'bhim', amount: 499, cashback: 10, type: 'Cashback' },

  { categoryId: 'dth', appId: 'gpay', amount: 999, cashback: 50, type: 'Cashback' },
  { categoryId: 'dth', appId: 'phonepe', amount: 999, cashback: 60, type: 'Cashback' },
  { categoryId: 'dth', appId: 'paytm', amount: 999, cashback: 90, type: 'Cashback' },
  { categoryId: 'dth', appId: 'amazon', amount: 999, cashback: 40, type: 'Coins' },
  { categoryId: 'dth', appId: 'cred', amount: 999, cashback: 20, type: 'None' },
  { categoryId: 'dth', appId: 'bhim', amount: 999, cashback: 20, type: 'Cashback' },

  { categoryId: 'dth', appId: 'gpay', amount: 1999, cashback: 100, type: 'Cashback' },
  { categoryId: 'dth', appId: 'phonepe', amount: 1999, cashback: 120, type: 'Cashback' },
  { categoryId: 'dth', appId: 'paytm', amount: 1999, cashback: 180, type: 'Cashback' },
  { categoryId: 'dth', appId: 'amazon', amount: 1999, cashback: 80, type: 'Coins' },
  { categoryId: 'dth', appId: 'cred', amount: 1999, cashback: 40, type: 'None' },
  { categoryId: 'dth', appId: 'bhim', amount: 1999, cashback: 40, type: 'Cashback' },

  // Insurance
  { categoryId: 'insurance', appId: 'gpay', amount: 99, cashback: 3, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'phonepe', amount: 99, cashback: 4, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'paytm', amount: 99, cashback: 6, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'amazon', amount: 99, cashback: 2, type: 'Coins' },
  { categoryId: 'insurance', appId: 'cred', amount: 99, cashback: 1, type: 'None' },
  { categoryId: 'insurance', appId: 'bhim', amount: 99, cashback: 1, type: 'Cashback' },

  { categoryId: 'insurance', appId: 'gpay', amount: 499, cashback: 15, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'phonepe', amount: 499, cashback: 20, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'paytm', amount: 499, cashback: 30, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'amazon', amount: 499, cashback: 12, type: 'Coins' },
  { categoryId: 'insurance', appId: 'cred', amount: 499, cashback: 8, type: 'None' },
  { categoryId: 'insurance', appId: 'bhim', amount: 499, cashback: 5, type: 'Cashback' },

  { categoryId: 'insurance', appId: 'gpay', amount: 999, cashback: 30, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'phonepe', amount: 999, cashback: 40, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'paytm', amount: 999, cashback: 60, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'amazon', amount: 999, cashback: 24, type: 'Coins' },
  { categoryId: 'insurance', appId: 'cred', amount: 999, cashback: 16, type: 'None' },
  { categoryId: 'insurance', appId: 'bhim', amount: 999, cashback: 10, type: 'Cashback' },

  { categoryId: 'insurance', appId: 'gpay', amount: 1999, cashback: 60, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'phonepe', amount: 1999, cashback: 80, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'paytm', amount: 1999, cashback: 120, type: 'Cashback' },
  { categoryId: 'insurance', appId: 'amazon', amount: 1999, cashback: 48, type: 'Coins' },
  { categoryId: 'insurance', appId: 'cred', amount: 1999, cashback: 32, type: 'None' },
  { categoryId: 'insurance', appId: 'bhim', amount: 1999, cashback: 20, type: 'Cashback' },
];
