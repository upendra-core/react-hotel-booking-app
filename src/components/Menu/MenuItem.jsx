/**
 * Represents a single food item in menu
 * Props:
 * - item: menu item object
 * - onAdd: function to add item to cart
 */
export default function MenuItem({ item, onAdd }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
      
      {/* Item details */}
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Price: ${item.price}</p>

      {/* Add to cart */}
      <button onClick={() => onAdd(item.id)}>
        Add to Cart
      </button>
    </div>
  );
}