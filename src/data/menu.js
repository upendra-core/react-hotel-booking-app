export const MENU = [
  { id: 1, name: "Paneer Butter Masala", category: "Main", price: 12.99 },
  { id: 2, name: "Chicken Biryani", category: "Rice", price: 14.5 },
  { id: 3, name: "Veg Fried Rice", category: "Rice", price: 10 },
  { id: 4, name: "Masala Dosa", category: "Breakfast", price: 8.99 },
  { id: 5, name: "Club Sandwich", category: "Snacks", price: 9.5 },
  { id: 6, name: "Lime Soda", category: "Drinks", price: 3.5 },
  { id: 7, name: "Margherita Pizza", category: "Fast Food", price: 11.99 },
  { id: 8, name: "Gulab Jamun", category: "Dessert", price: 5.99 },
];

export const CATEGORIES = ["All", ...new Set(MENU.map(m => m.category))];