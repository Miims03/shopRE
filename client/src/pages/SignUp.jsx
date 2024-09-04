import React, { useState } from 'react';
import { signupUser } from '../services/userService'; // Assurez-vous que le chemin est correct
import validator from 'validator'; // Pour valider si l'entrée est un email

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Ce champ peut contenir soit l'email soit le username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    setLoading(true);
    setError(null);

    // Vérifier si l'entrée est un email ou un nom d'utilisateur
    const isEmail = validator.isEmail(email);

    try {
      // Envoyer les données de connexion
      const data = await signupUser({
        email: isEmail ? email : null, 
        username: username,
        password: password
      });

      // Stocker le token dans le localStorage
      localStorage.setItem('token', data.token);

      // Redirection ou autre action après la connexion réussie
      console.log('Register successful!');

    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          {loading ? 'Loading...' : 'Register'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}
