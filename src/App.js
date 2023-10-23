import React, { useState, useEffect } from "react";
import ProductForm from "./components/Forms/ProductForm";
import SearchBar from "./components/Search/SearchBar";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"; // Lägg till Routes här

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const user = {
    username: "TK@hotmail.com",
    password: "Password1337",
  };

  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);

  useEffect(() => {
    fetch("https://localhost:8000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((newToken) => {
        setToken(newToken.token);
        console.log(newToken);
      })
      .catch((error) => {
        console.error("Fel vid tillägg av användare:", error);
      });
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setShowLoggedInMessage(true);
    console.log(`Inloggad som ${username}`);

    setTimeout(() => {
      setShowLoggedInMessage(false);
    }, 2000);
  };

  const handleOnAdd = (product) => {
    console.log(token);
    fetch("https://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.status === 201) {
          setMessage("Produkten har sparats.");
          return response.json();
        } else {
          setMessage("Det uppstod ett fel när produkten sparades.");
          throw Error("Sparningsfel");
        }
      })
      .then((newProduct) => {
        setProducts([...products, newProduct]);
      })
      .catch((error) => {
        setMessage("Det uppstod ett fel när produkten sparades.");
        console.error(error);
      });
  };

  const handleSearch = (searchQuery) => {
    fetch(`https://localhost:8000/products/${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="App">
      <p className="text-center py-4 text-xl font-semibold">
        Product Manager - Freaky Fashion
      </p>
      <BrowserRouter>
        <header className="App-header">
          <div className="bg-black">
            <nav className="bg-black-600 p-4">
              <ul className="flex justify-center space-x-4">
                <li>
                  <Link
                    to="/login"
                    className="text-white hover:text-orange-500"
                  >
                    Logga in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/produktskapande"
                    className="text-white hover:text-orange-500"
                  >
                    Skapa produkt
                  </Link>
                </li>
                <li>
                  <Link to="/sok" className="text-white hover:text-orange-500">
                    Sök
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            {" "}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/produktskapande"
              element={<ProductForm onAdd={handleOnAdd} />}
            />
            <Route
              path="/sok"
              element={
                <SearchBar
                  onSearch={handleSearch}
                  result={products}
                  onDelete={handleDelete}
                />
              }
            />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
