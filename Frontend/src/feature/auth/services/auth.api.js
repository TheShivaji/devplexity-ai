import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials: true,
});

export const signUp = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.log("Error in  signup api", error.message);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.log("Error in  login api", error.message);
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await api.get('/auth/get-me');
        return response.data;
    } catch (error) {
        console.log("Error in  getMe api", error.message);
        throw error;
    }
};