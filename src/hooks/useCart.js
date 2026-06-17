import { useState, useMemo ,useEffect} from "react";
import { getProducts } from "../api/productApi";
// import { MENU } from "../data/menu";

/**
 * Custom hook to encapsulate all cart-related logic.
 * This keeps business logic OUT of UI components.
 */
export default function useCart() {

  const [products, setProducts] = useState([]);
   /**
   * Loading + error states
   */
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  // Cart state: { itemId: quantity }
  const [cart, setCart] = useState({});

    /**
     * Fetch products on component mount
     */
    useEffect(() => {
  
      async function loadProducts() {
  
        try {
  
          setLoading(true);
  
          const data = await getProducts();
  
          setProducts(data);
  
        } catch (err) {
  
          setError(err.message);
  
        } finally {
  
          setLoading(false);
        }
      }
  
      loadProducts();
  
    }, []);


  const categories = useMemo(() => {

    const uniqueCategories = new Set(
      products.map(product => product.category.toLowerCase())
    );

    return ["All", ...uniqueCategories];

  }, [products]);

  /**
   * Convert MENU array into a lookup map:
   * { 1: {...}, 2: {...} }
   * This avoids expensive .find() calls repeatedly
   */
  const menuMap = useMemo(() => {
    return Object.fromEntries(products.map(m => [m.id, m]));
  }, [products]);

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
  const addItemToCart = (id) => {
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

    /**
   * Product state
   */
    products,
    categories,
    loading,
    error,

    /**
    * Cart state
    */
    cart,
    cartItems,
    subtotal,

    /**
     * Actions
     */
    add: addItemToCart,
    remove,
    updateQty,
    clearCart
  };
}