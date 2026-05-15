import { useDispatch } from "react-redux";
import { signUp, login, getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleSignUp = async (userData) => {
        try {
            dispatch(setLoading(true));
            const response = await signUp(userData);
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
            dispatch(setError(errorMsg));
            console.log("Error in  signup hook", errorMsg);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogin = async (credentials) => {
        try {
            dispatch(setLoading(true));
            const response = await login(credentials);
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
            dispatch(setError(errorMsg));
            console.log("Error in  login hook", errorMsg);
            throw error;
        } finally {
            dispatch(setLoading(false));
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
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        handleSignUp,
        handleLogin,
        handleGetMe
    };
};