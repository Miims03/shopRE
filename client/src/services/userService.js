// userService.js
import axiosInstance from './axiosConfig';

export const fetchUserData = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/find/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users/find');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async ({username, email, password}) => {
    try {
        const response = await axiosInstance.post('/users/login', {
            username,
            email,
            password 
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signupUser = async ({username, email, password, dob, firstname, lastname}) => {
    try {
        const response = await axiosInstance.post('/users/register', {
            username, 
            email,
            password,
            dob,
            firstname,
            lastname
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};