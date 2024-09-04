// user.js
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const database = require('../database'); 

const User = database.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,  // Utilise la fonction uuidv4 pour générer un UUID par défaut
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

database.sync()

module.exports = User;
