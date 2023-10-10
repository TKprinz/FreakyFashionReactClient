import React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";

function MainMenu() {
  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-center py-8 text-xl font-bold">Meny</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="border rounded-md p-2 w-full mr-2"
          placeholder="Ny produkt"
        />
        <button className="bg-black hover:bg-green-500 text-white font-bold py-2 px-4 rounded w-20">
          Lägg till
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="border rounded-md p-2 w-full mr-2"
          placeholder="Sök produkt"
        />
        <button className="bg-black hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-20">
          Sök
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="border rounded-md p-2 w-full mr-2"
          placeholder="Radera produkt"
        />
        <button className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-20">
          Radera
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
