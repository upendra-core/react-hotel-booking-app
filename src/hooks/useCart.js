import { useState, useMemo } from "react";
import { MENU } from "../data/menu";

/**
 * Custom hook to encapsulate all cart-related logic.
 * This keeps business logic OUT of UI components.
 */
export default function useCart() {

  // Cart state: { itemId: quantity }
  const [cart, setCart] = useState({});

  /**
   * Convert MENU array into a lookup map:
   * { 1: {...}, 2: {...} }
   * This avoids expensive .find() calls repeatedly
   */
  const menuMap = useMemo(() => {
    return Object.fromEntries(MENU.map(m => [m.id, m]));
  }, []);

  /**
   * Convert cart object into usable array for UI
   * [{ id, name, price, qty }]
   */
  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => ({
      ...menuMap[id],
      qty,
    }));
  }, [cart, menuMap]);

  /**
   * Calculate total price of cart
   * Memoized for performance optimization
   */
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  }, [cartItems]);

  /**
   * Add item to cart
   * If already exists → increment quantity
   */
  const add = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  /**
   * Remove item completely from cart..
   */
  const remove = (id) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  /**
   * Update item quantity
   * If qty <= 0 → remove item
   */
  const updateQty = (id, qty) => {
    if (qty <= 0) return remove(id);
    setCart(prev => ({ ...prev, [id]: qty }));
  };

  /**
   * Clear entire cart (used after order placed)
   */
  const clearCart = () => setCart({});

  return {
    cart,
    cartItems,
    subtotal,
    add,
    remove,
    updateQty,
    clearCart
  };
}