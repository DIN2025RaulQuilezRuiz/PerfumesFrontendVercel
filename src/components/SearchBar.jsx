/**
 * SearchBar component - A controlled input field for searching
 * @component
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - The current search input value
 * @param {Function} props.onSearchChange - Callback function invoked when the search input changes, receives the new input value
 * @param {string} [props.placeholder="Buscar..."] - Placeholder text displayed in the search input
 * @returns {JSX.Element} A search input field wrapped in a container with accessibility labels
 */
function SearchBar({ searchTerm, onSearchChange, placeholder = "Buscar..." }) {
    return (
        <div className="search-bar-container">
            <label htmlFor="search-input" className="sr-only">
                {placeholder}
            </label>
            <input
                id="search-input"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                // Llama a la función proporcionada por el padre en cada cambio
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
                aria-label={placeholder}
            />
        </div>
    );
}
export default SearchBar;

