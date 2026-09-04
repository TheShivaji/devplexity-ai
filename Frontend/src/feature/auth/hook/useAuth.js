import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { signUp, login, getMe } from "../services/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleSignUp = async (userData) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await signUp(userData);
            dispatch(setUser(response.user));
            toast.success("Account created successfully");
            return response;
        } catch (error) {
            const errorMsg = getAuthErrorMessage(error);
            dispatch(setError(errorMsg));
            toast.error(errorMsg);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogin = async (credentials) => {
        try {
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response = await login(credentials);
            dispatch(setUser(response.user));
            toast.success("Welcome back!");
            return response;
        } catch (error) {
            const errorMsg = getAuthErrorMessage(error);
            dispatch(setError(errorMsg));
            toast.error(errorMsg);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetMe = async () => {
        try {
            const response = await getMe();
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            dispatch(setError(getAuthErrorMessage(error)));
            throw error;
        }
    };

    return {
        handleSignUp,
        handleLogin,
        handleGetMe
    };
};
