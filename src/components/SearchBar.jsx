function SearchBar({ searchTerm, onSearchChange, placeholder = "Buscar..." }) {
    return (
        <div className="w-full">
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
                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                aria-label={placeholder}
            />
        </div>
    );
}

export default SearchBar;
