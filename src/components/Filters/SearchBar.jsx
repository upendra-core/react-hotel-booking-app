/**
 * Controlled input component for searching menu items
 * Props:
 * - search: current search value
 * - setSearch: function to update search state
 */
export default function SearchBar({ search, setSearch }) {
  return (
    <input
      placeholder="Search food..."
      value={search} // controlled input
      onChange={(e) => setSearch(e.target.value)} // update parent state
      style={{ padding: 8, width: "100%", marginBottom: 10 }}
    />
  );
}