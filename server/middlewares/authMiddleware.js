// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (token == null) return res.sendStatus(401); // Si pas de token, accès interdit

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Si token invalide, accès interdit

        req.user = user; // Ajout de l'utilisateur au req pour les routes protégées
        next(); // Passe au middleware suivant ou à la route
    });
};

module.exports = authenticateToken;
