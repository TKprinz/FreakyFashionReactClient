import ProductForm from "./components/Forms/ProductForm";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const handleOnAdd = (product) => {
    // 1 - skicka informationen till web API:et med HTTP POST
    fetch("https://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((product) => {
        // 2 - vid svar, lägg till nya fordonet till array av foron (Products)
        setProducts([...products, product]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <ProductForm onAdd={handleOnAdd} />
      </header>
      <p className="text-center py-4 text-xl font-semibold">
        Product Manager - Freaky Fashion
      </p>
    </div>
  );
}

export default App;
