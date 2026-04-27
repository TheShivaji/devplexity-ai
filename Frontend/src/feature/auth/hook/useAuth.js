import {useDispatch} from "react-redux";
import {signUp , login , getMe} from "../services/auth.api";
import {setUser , setLoading , setError} from "../auth.slice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleSignUp = async (userData) => {
        try {
            dispatch(setLoading(true));
            const response = await signUp(userData);
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            console.log("Error in  signup hook", error.message);
            throw error;
        }
    };

    const handleLogin = async (credentials) => {
        try {
            dispatch(setLoading(true));
            const response = await login(credentials);
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            console.log("Error in  login hook", error.message);
            throw error;
        }
    };

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getMe();
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            console.log("Error in  getMe hook", error.message);
            throw error;
        }
    };

    return {
        handleSignUp,
        handleLogin,
        handleGetMe
    };
};