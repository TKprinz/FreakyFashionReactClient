import React, { useState, useEffect } from "react";
import ProductForm from "./components/Forms/ProductForm";
import SearchBar from "./components/Search/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const user = {
    username: "TK@hotmail.com",
    password: "Password1337",
  };

  useEffect(() => {
    fetch("https://localhost:8000/auth", {
      // Använd en relativ URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((newToken) => {
        // Uppdatera användarna med det nya objektet från API:et
        setToken(newToken.token);
        // console.log(newToken);
        console.log(newToken);
      })
      .catch((error) => {
        console.error("Fel vid tillägg av användare:", error);
      });
  }, []);

  const handleOnAdd = (product) => {
    console.log(token);
    // Skicka informationen till web API:et med HTTP POST
    fetch("https://localhost:8000/products", {
      // Använd en relativ URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((newProduct) => {
        // Uppdatera produkterna med det nya objektet från API:et
        setProducts([...products, newProduct]);
      })
      .catch((error) => {
        console.error("Fel vid tillägg av produkt:", error);
      });
  };

  const handleSearch = (searchQuery) => {
    // Gör en fetch-anrop till ditt web-API med den aktuella söktermen
    fetch(`https://localhost:8000/products/${searchQuery}`, {
      // Använd en relativ URL
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Logga resultatet från API:et
        // Uppdatera produkter med sökresultaten från API:et
        setProducts(data);
      })
      .catch((error) => {
        console.error("Fel vid sökning:", error);
      });
  };

  const handleDelete = (productId) => {
    setProducts(null);

    const confirmed = window.confirm(
      "Är du säker på att du vill radera produkten?"
    );
    if (!confirmed) {
      return;
    }
    fetch(`https://localhost:8000/products/${productId}`, {
      method: "delete",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
  };
  return (
    <div className="App">
      <p className="text-center py-4 text-xl font-semibold">
        Product Manager - Freaky Fashion
      </p>
      <header className="App-header">
        <ProductForm onAdd={handleOnAdd} />
        <SearchBar
          onSearch={handleSearch}
          result={products}
          onDelete={handleDelete}
        />
      </header>
    </div>
  );
}

export default App;
