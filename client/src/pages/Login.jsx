import React, { useState } from 'react';
import { loginUser } from '../services/userService'; // Assurez-vous que le chemin est correct

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      // Rediriger ou faire quelque chose après la connexion
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
        <a href="/register">Register</a>
      </form>
    </main>
  );
}
