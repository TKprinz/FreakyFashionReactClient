import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const initialFormData = {
    productName: "",
    stockKeepingUnit: "",
    description: "",
    image: "",
    price: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isProductSaved, setIsProductSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Simulera ett asynkront Web API-anrop (ersätt detta med ditt eget API-anrop)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulera en 1 sekunds fördröjning

      onAdd(formData);
      setIsProductSaved(true);
      setTimeout(() => {
        setIsProductSaved(false);
      }, 5000);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Fel vid sparande av produkt:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">Lägg till produkt</h2>

        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Namn
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="stockKeepingUnit"
            className="block text-sm font-medium text-gray-700"
          >
            SKU
          </label>
          <input
            type="text"
            id="stockKeepingUnit"
            name="stockKeepingUnit"
            className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.stockKeepingUnit}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Beskrivning
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Bildlänk
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Pris
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover-bg-gray-800 focus:ring focus-ring-gray-300"
          >
            Lägg till
          </button>
        </div>

        {isProductSaved && (
          <div className="text-green-500 mt-2 text-sm">
            Produkten är sparad.
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
