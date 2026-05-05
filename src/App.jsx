import React, { useMemo, useState } from "react";

// Static menu data representing items available in the hotel
// Each item has id, name, category, and price
const MENU = [
  { id: 1, name: "Paneer Butter Masala", category: "Main", price: 12.99 },
  { id: 2, name: "Chicken Biryani", category: "Rice", price: 14.5 },
  { id: 3, name: "Veg Fried Rice", category: "Rice", price: 10 },
  { id: 4, name: "Masala Dosa", category: "Breakfast", price: 8.99 },
  { id: 5, name: "Club Sandwich", category: "Snacks", price: 9.5 },
  { id: 6, name: "Lime Soda", category: "Drinks", price: 3.5 },
  { id: 7, name: "Margherita Pizza", category: "Fast Food", price: 11.99 },
  { id: 8, name: "Gulab Jamun", category: "Dessert", price: 5.99 },
];

// Extract unique categories dynamically from MENU
// "All" is added as default option to show all items
const CATEGORIES = ["All", ...new Set(MENU.map((m) => m.category))];

export default function App() {

  // State to store search input value
  const [search, setSearch] = useState("");

  // State to store selected category filter
  const [category, setCategory] = useState("All");

  // Cart state: stores itemId -> quantity
  // Example: {1: 2, 3: 1}
  const [cart, setCart] = useState({});

  // Customer details state
  const [customer, setCustomer] = useState({
    name: "",
    room: "",
    phone: "",
  });

  // Stores generated order ID after placing order
  const [orderId, setOrderId] = useState(null);

  // Memoized filtering logic to avoid recalculating on every render
  // Re-runs only when search or category changes
  const filteredMenu = useMemo(() => {
    return MENU.filter((item) => {

      // Check if item name matches search text (case-insensitive)
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());

      // Check if item matches selected category
      const matchCategory = category === "All" || item.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  // Convert cart object into array of items with full details
  // Example output: [{id, name, price, qty}]
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = MENU.find((m) => m.id === Number(id));
    return { ...item, qty };
  });

  // Calculate total price of all items in cart
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  // Add item to cart (increase quantity)
  const add = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Remove item completely from cart
  const remove = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id]; // remove key from object
      return copy;
    });
  };

  // Update quantity of an item
  // If qty <= 0, remove item from cart
  const updateQty = (id, qty) => {
    if (qty <= 0) return remove(id);
    setCart((prev) => ({ ...prev, [id]: qty }));
  };

  // Place order function
  const placeOrder = () => {

    // Prevent placing order if cart is empty
    if (!cartItems.length) return;

    // Generate random order ID
    const id = "HOTEL-" + Math.floor(Math.random() * 100000);

    // Save order ID to state
    setOrderId(id);

    // Clear cart after placing order
    setCart({});

    // Show alert message
    alert("Order placed successfully!");

    // Clear order ID after 5 seconds (for UI cleanup)
    setTimeout(() => {
      setOrderId(null);
    }, 5000);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>🏨  Hotel Ordering System...</h1>

      {/* Show success message if order is placed */}
      {orderId && (
        <div style={{ background: "#d1fae5", padding: 10, marginBottom: 10 }}>
          ✅ Order placed! ID: {orderId}
        </div>
      )}

      {/* SEARCH INPUT */}
      <input
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // update search state
        style={{ padding: 8, width: "100%", marginBottom: 10 }}
      />

      {/* CATEGORY FILTER BUTTONS */}
      <div style={{ marginBottom: 10 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)} // update selected category
            style={{
              margin: 4,
              padding: 6,
              background: category === cat ? "#333" : "#eee",
              color: category === cat ? "#fff" : "#000",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20 }}>

        {/* MENU SECTION */}
        <div style={{ flex: 2 }}>
          <h2>Menu</h2>

          {/* Render filtered menu items */}
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>

              {/* Add item to cart */}
              <button onClick={() => add(item.id)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* CART SECTION */}
        <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: 10 }}>
          <h2>Cart 🛒</h2>

          {/* Show message if cart is empty */}
          {cartItems.length === 0 && <p>No items in cart</p>}

          {/* Render cart items */}
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <b>{item.name}</b>
              <p>${item.price}</p>

              {/* Decrease quantity */}
              <button onClick={() => updateQty(item.id, item.qty - 1)}>
                -
              </button>

              {/* Current quantity */}
              <span style={{ margin: "0 10px" }}>{item.qty}</span>

              {/* Increase quantity */}
              <button onClick={() => updateQty(item.id, item.qty + 1)}>
                +
              </button>

              {/* Remove item */}
              <button
                onClick={() => remove(item.id)}
                style={{ marginLeft: 10 }}
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          {/* Total price */}
          <h3>Total: ${subtotal.toFixed(2)}</h3>

          {/* Place order button */}
          <button
            onClick={placeOrder}
            disabled={!cartItems.length} // disable if empty
            style={{
              padding: 10,
              background: "green",
              color: "white",
              width: "100%",
              marginTop: 10,
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* CUSTOMER INFORMATION SECTION */}
      <div style={{ marginTop: 20 }}>
        <h2>Customer Info</h2>

        {/* Name input */}
        <input
          placeholder="Name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
          style={{ display: "block", marginBottom: 5 }}
        />

        {/* Room number input */}
        <input
          placeholder="Room No"
          value={customer.room}
          onChange={(e) =>
            setCustomer({ ...customer, room: e.target.value })
          }
          style={{ display: "block", marginBottom: 5 }}
        />

        {/* Phone input */}
        <input
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
          style={{ display: "block", marginBottom: 5 }}
        />
      </div>
    </div>
  );
}

// Additional style object (currently unused in UI)
const styles = {
  categoryWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px",
  },

  categoryBtn: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};