import { useState, useMemo } from "react";
//import { MENU, CATEGORIES } from "./data/menu";
import useCart from "./hooks/useCart";

import SearchBar from "./components/Filters/SearchBar";
import CategoryFilter from "./components/Filters/CategoryFilter";
import MenuList from "./components/Menu/MenuList";
import Cart from "./components/Cart/Cart";
import CustomerForm from "./components/Customer/CustomerForm";

/**
 * Root component (Container)
 * Responsible for:
 * - State management
 * - Business logic
 * - Passing props to child components
 */
export default function App() {


  // Search + filter state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Customer info state
  const [customer, setCustomer] = useState({
    name: "",
    room: "",
    phone: "",
  });

  // Order success state
  const [orderId, setOrderId] = useState(null);

  // Cart logic from custom hook
  const {
    products,
    categories,
    loading,
    error,
    cartItems,
    subtotal,
    add,
    remove,
    updateQty,
    clearCart
  } = useCart();


  

  /**
   * Filter menu based on search + category
   * Memoized for performance
   */
  const filteredMenu = useMemo(() => {
    return products.filter(item => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || item.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category, products]);

  /**
   * Handles order placement
   */
  const placeOrder = () => {
    if (!cartItems.length) return;

    // Basic validation
    if (!customer.name || !customer.room || !customer.phone) {
      alert("Fill customer details");
      return;
    }

    // Generate unique ID (better than Math.random)
    const id = crypto.randomUUID();

    setOrderId(id);

    // Clear cart after order
    clearCart();

    // Auto-hide success message
    setTimeout(() => setOrderId(null), 5000);
  };

  // debug logs
  console.log("products:",products);
  console.log("filteredMenu:",filteredMenu);
  console.log("category",category);

  if (loading) {
  return <h2>Loading...</h2>;
}
if (error) {
  return <h2>Error: {error}</h2>;
}

  return (
    <div style={{ padding: 20 }}>
      <h1>🏨 Hotel Ordering System</h1>

      {/* Order success message */}
      {orderId && <div>✅ Order ID: {orderId}</div>}

      {/* Filters */}
      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      {/* Main layout */}
      <div style={{ display: "flex", gap: 20 }}>
        
        {/* Menu section */}
        <div style={{ flex: 2 }}>
          <MenuList items={filteredMenu} onAdd={add} />
        </div>

        {/* Cart section */}
        <Cart
          cartItems={cartItems}
          subtotal={subtotal}
          onUpdate={updateQty}
          onRemove={remove}
          onPlaceOrder={placeOrder}
        />
      </div>

      {/* Customer info */}
      <CustomerForm
        customer={customer}
        setCustomer={setCustomer}
      />
    </div>
  );
}