import CartItem from "./CartItem";

/**
 * Cart container component
 * Props:
 * - cartItems: list of items in cart
 * - subtotal: total price
 * - onUpdate: update quantity
 * - onRemove: remove item
 * - onPlaceOrder: submit order
 */
export default function Cart({
  cartItems,
  subtotal,
  onUpdate,
  onRemove,
  onPlaceOrder,
}) {
  return (
    <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: 10 }}>
      
      <h2>Cart 🛒</h2>

      {/* Empty state */}
      {cartItems.length === 0 && <p>No items</p>}

      {/* Render cart items */}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}

      <hr />

      {/* Total price */}
      <h3>Total: ${subtotal.toFixed(2)}</h3>

      {/* Place order */}
      <button
        onClick={onPlaceOrder}
        disabled={!cartItems.length}
        style={{
          width: "100%",
          padding: 10,
          background: "green",
          color: "#fff"
        }}
      >
        Place Order
      </button>
    </div>
  );
}