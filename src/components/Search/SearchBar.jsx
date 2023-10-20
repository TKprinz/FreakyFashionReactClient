import React, { useState } from "react";

const SearchBar = ({ onSearch, result, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);

    console.log(result);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(result.id);
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
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-xl mx-auto">
        {result ? (
          <div>
            <p className="text-3xl font-bold text-white">
              {result.productName}
            </p>
            <button
              onClick={handleDelete}
              className="px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring focus:ring-gray-300"
            >
              Radera
            </button>
          </div>
        ) : (
          <p className="text-2xl font-semibold text-red-500">
            Detta kommer att visas om result är false.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
