import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Här kan du göra en HTTP-förfrågan till din backend för att autentisera användaren
    // Ersätt detta med riktig autentiseringslogik
    try {
      // Här kan du använda en inloggningstjänst för att verifiera användarnamn och lösenord
      // Om inloggningen är framgångsrik, anropa onLogin-funktionen för att meddela huvudappen att användaren är inloggad
      const response = await fetch("https://localhost:8000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        onLogin(username);
      } else {
        setError("Felaktigt användarnamn eller lösenord.");
      }
    } catch (error) {
      setError("Ett fel uppstod vid inloggningen.");
      console.error("Fel vid inloggning:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
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
            onChange={handleUsernameChange}
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
            onChange={handlePasswordChange}
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
    </div>
  );
};

export default Login;
