import React, { useState } from 'react';
import { loginUser } from '../services/userService'; // Assurez-vous que le chemin est correct
import validator from 'validator'; // Pour valider si l'entrée est un email

export default function Login() {
  const [loginField, setLoginField] = useState(''); // Ce champ peut contenir soit l'email soit le username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    setLoading(true);
    setError(null);

    // Vérifier si l'entrée est un email ou un nom d'utilisateur
    const isEmail = validator.isEmail(loginField);

    try {
      // Envoyer les données de connexion
      const data = await loginUser({
        email: isEmail ? loginField : null, 
        username: isEmail ? null : loginField, // Utiliser l'email ou le nom d'utilisateur
        password
      });

      // Stocker le token dans le localStorage
      localStorage.setItem('token', data.token);

      // Redirection ou autre action après la connexion réussie
      console.log('Login successful!');

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
          placeholder="Email or Username"
          value={loginField}
          onChange={(e) => setLoginField(e.target.value)}
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
      </form>
    </main>
  );
}
