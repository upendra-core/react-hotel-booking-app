import MenuItem from "./MenuItem";

/**
 * Displays list of menu items
 * Props:
 * - items: filtered menu items
 * - onAdd: function to add item to cart
 */
export default function MenuList({ items, onAdd }) {
  return (
    <div>
      <h2>Menu</h2>

      {/* Render each menu item */}
      {items.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}