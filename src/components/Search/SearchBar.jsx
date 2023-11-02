import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, result, onDelete, setResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults(null);
    }
  }, [searchQuery, setResults]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(result.id);

    // Visa meddelandet "Produkten har tagits bort" och ställ in en timeout för att ta bort det efter 5 sekunder
    setResults(null); // Rensa resultaten när produkten tas bort
    setTimeout(() => {
      setResults(null); // Rensa raderingsmeddelandet
    }, 5000);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">Sök produkt</h2>
        <div className="mb-4">
          <label
            htmlFor="searchQuery"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="text"
            id="searchQuery"
            name="searchQuery"
            className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:ring focus:ring-gray-300"
          >
            Sök
          </button>
        </div>
      </form>
      <div className="p-4 max-w-xl mx-auto">
        {result ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {result.productName} {result.stockKeepingUnit}
              </h2>
            </div>
            <div>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-500 hover:text-black focus:ring focus:ring-gray-300"
              >
                Radera
              </button>
            </div>
          </div>
        ) : (
          result !== null && (
            <div className="bg-white p-8 rounded-lg shadow-lg w-full">
              <p className="text-2xl font-semibold text-green-500">
                Produkten har tagits bort.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
