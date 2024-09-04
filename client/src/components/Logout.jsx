import React from 'react';
import { useHistory } from 'react-router-dom'; // Si vous utilisez react-router-dom

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        
        // Rediriger l'utilisateur vers la page de connexion ou une autre page
        history.push('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
