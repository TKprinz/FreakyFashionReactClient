import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProductForm from "./components/Forms/ProductForm";
import SearchBar from "./components/Search/SearchBar";
import Login from "./components/Login/Login";

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
        console.error("Fel vid inloggning:", error);
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
        if (response.ok) {
          return response.json();
        } else {
          // Om det inte är en lyckad respons (status är inte 2xx), kasta ett fel
          throw new Error("Något gick fel vid sparandet av produkten.");
        }
      })
      .then((newProduct) => {
        // Uppdatera produkterna med den nya produkten
        setProducts([...products, newProduct]);
        setMessage("Produkten har sparats.");

        // Schedule the removal of the message after 2 seconds
        setTimeout(() => {
          setMessage(""); // Clear the message
        }, 2000); // 2000 milliseconds (2 seconds)
      })
      .catch((error) => {
        // Felhantering om något går fel i fetch eller vid parsning av respons
        setMessage("Det uppstod ett fel när produkten sparades.");
        // Schedule the removal of the message after 2 seconds
        setTimeout(() => {
          setMessage(""); // Clear the message
        }, 2000); // 2000 milliseconds (2 seconds)

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
    setProducts([]);
    const confirmed = window.confirm(
      "Är du säker på att du vill radera produkten?"
    );
    if (!confirmed) {
      return;
    }
    fetch(`https://localhost:8000/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
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
                {isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/produktskapande"
                        className="text-white hover:text-orange-500"
                      >
                        Skapa produkt
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/sok"
                        className="text-white hover:text-orange-500"
                      >
                        Sök
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-white hover:text-orange-500"
                        onClick={handleLogOut}
                      >
                        Logga ut
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/produktskapande"
              element={<ProductForm onAdd={handleOnAdd} message={message} />}
            />
            <Route
              path="/sok"
              element={
                <SearchBar
                  onSearch={handleSearch}
                  result={products}
                  onDelete={handleDelete}
                  setResults={setProducts}
                />
              }
            />
          </Routes>
        </header>
      </BrowserRouter>
      {showLoggedInMessage && (
        <div
          className="bg-black p-4 text-white text-center"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Inloggning lyckades
        </div>
      )}
    </div>
  );
}

export default App;
