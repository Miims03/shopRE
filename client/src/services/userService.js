// userService.js
import axiosInstance from './axiosConfig';

export const fetchUserData = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/find/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
};

export const fetchAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users/find');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
};

export const loginUser = async ({username, email, password}) => {
    try {
        const response = await axiosInstance.post('/users/login', { username, email, password });
        return response.data;
    } catch (error) {
        throw error; // Propager l'erreur pour le traitement dans le composant
    }
};

export const signupUser = async ({username, email, password}) => {
    try {
        const response = await axiosInstance.post('/users/register', { username, email, password });
        return response.data;
    } catch (error) {
        throw error; // Propager l'erreur pour le traitement dans le composant
    }
};