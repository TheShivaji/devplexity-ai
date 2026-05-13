import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.log("Error in  logout api", error.response?.data?.message || error.message);
        throw error.response?.data?.message;
    }
};
