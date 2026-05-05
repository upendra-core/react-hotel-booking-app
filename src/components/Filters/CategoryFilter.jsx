/**
 * Displays category buttons for filtering menu
 * Props:
 * - categories: array of category names
 * - selected: currently selected category
 * - onSelect: callback when category is clicked
 */
export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)} // notify parent
          style={{
            margin: 4,
            padding: 6,
            background: selected === cat ? "#333" : "#eee",
            color: selected === cat ? "#fff" : "#000",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}