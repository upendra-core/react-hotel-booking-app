/**
 * Represents a single item inside cart
 * Props:
 * - item: cart item (includes qty)
 * - onUpdate: update quantity
 * - onRemove: remove item
 */
export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div style={{ marginBottom: 10 }}>
      
      <b>{item.name}</b>
      <p>${item.price}</p>

      {/* Quantity controls */}
      <button onClick={() => onUpdate(item.id, item.qty - 1)}>
        -
      </button>

      <span style={{ margin: "0 10px" }}>
        {item.qty}
      </span>

      <button onClick={() => onUpdate(item.id, item.qty + 1)}>
        +
      </button>

      {/* Remove item */}
      <button
        onClick={() => onRemove(item.id)}
        style={{ marginLeft: 10 }}
      >
        Remove
      </button>
    </div>
  );
}