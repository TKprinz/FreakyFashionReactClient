import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importera useNavigate

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hämta navigationsfunktionen

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implementera din inloggningslogik här och om inloggningen är framgångsrik:
    // 1. Anropa onLogin-funktionen för att meddela förälder om inloggningen.
    // 2. Uppdatera isLoggedIn till true.

    // Exempel:
    if (username === "TK@hotmail.com" && password === "Password1337") {
      onLogin(username);
      setIsLoggedIn(true);
      setError(""); // Nollställ felmeddelandet om inloggningen är framgångsrik
      // Omdirigera användaren till en annan sida
      setTimeout(() => {
        navigate("/produktskapande");
      }, 2000);
    } else {
      setError("Fel användarnamn eller lösenord.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {isLoggedIn ? (
        // Användaren är inloggad, visa ett meddelande eller gör vad du vill
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
      ) : (
        // Användaren är inte inloggad, visa inloggningsformuläret
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg mt-20"
        >
          <h2 className="text-2xl font-semibold mb-6">Logga in</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Användarnamn
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-3 w-full border rounded-lg focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:ring focus:ring-gray-300"
            >
              Logga in
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
