import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed

// Assume API_URL is configured, e.g., from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Example

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); // Changed from 'role' to 'userRole' for consistency
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(false); // Add a global loading state for auth actions
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) {
            localStorage.setItem('token', userToken);
            localStorage.setItem('userRole', userRole); // Persist role alongside token
            axios.defaults.headers.common['x-auth-token'] = userToken;
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            delete axios.defaults.headers.common['x-auth-token'];
            setIsAuthenticated(false);
        }
    }, [userToken, userRole]); 

    const redirectToDashboard = (role) => {
        switch (role) {
            case 'STUDENT':
                navigate('/student');
                break;
            case 'ORGANIZER':
                navigate('/organizer');
                break;
            case 'JUDGE':
                navigate('/judge');
                break;
            default:
                console.warn("Unknown role for redirection:", role);
                navigate('/login'); // Fallback or a generic dashboard
        }
    };

    const loginAction = async (email, password, selectedRole) => {
        setIsLoading(true);
        if (!API_URL) {
            setIsLoading(false);
            return { success: false, message: "API URL is not configured. Please check your environment variables." };
        }

        let endpoint = '';
        switch (selectedRole) {
            case 'STUDENT':
                endpoint = `${API_URL}/auth/login-student`;
                break;
            case 'ORGANIZER':
                endpoint = `${API_URL}/auth/login-organizer`;
                break;
            case 'JUDGE':
                // Corrected potential double slash from original code: /auth//login-judge
                endpoint = `${API_URL}/auth/login-judge`;
                break;
            default:
                setIsLoading(false);
                return { success: false, message: "Invalid role selected for login." };
        }

        const requestBody = { email, password };

        try {
            const response = await axios.post(endpoint, requestBody, {
                headers: { 'Content-Type': 'application/json' },
            });
            const responseData = response.data;

            if (responseData && responseData.token) {
                setUserToken(responseData.token);
                setUserRole(selectedRole); // Set the role based on selection, assuming backend doesn't return it or confirms it
                setIsAuthenticated(true);
                redirectToDashboard(selectedRole);
                setIsLoading(false);
                return { success: true };
            } else {
                setIsLoading(false);
                return { success: false, message: responseData.message || "Login successful, but no token received." };
            }
        } catch (err) {
            console.error("Login API error:", err);
            setIsLoading(false);
            let errorMessage = "An error occurred during login. Please try again later.";
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            } else if (err.request) {
                errorMessage = "No response from server. Please check your network connection.";
            } else if (err.message) {
                // For other errors (e.g., network issues before request is sent, or errors in setting up the request)
                errorMessage = err.message;
            }
            // Clear any potentially partially set auth state on error
            setUserToken(null);
            setUserRole(null);
            setIsAuthenticated(false);
            return { success: false, message: errorMessage };
        }
    };

    const signupAction = async (name, email, password, confirmPassword, organization, selectedRole ) => {
        setIsLoading(true);
        if (password !== confirmPassword) {
            setIsLoading(false);
            return { success: false, message: "Passwords do not match." };
        }
        if (!API_URL) {
            setIsLoading(false);
            return { success: false, message: "API URL is not configured. Please check your environment variables." };
        }
        let endpoint = '';
        let requestBody = {};

        if (selectedRole === 'STUDENT') {
            endpoint = `${API_URL}/auth/register-student`;
            requestBody = { name, email, password };
        } else {
            if (!organization) {
                setIsLoading(false);
                return { success: false, message: "Organization is required for organizers." };
            }
            endpoint = `${API_URL}/auth/register-organizer`;
            requestBody = { name, email, password, organization };
        }

        try {
            const response = await axios.post(endpoint, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = response.data;

            if (responseData && responseData.token) {
                setUserToken(responseData.token);
                setUserRole(selectedRole); // Set the role based on selection, assuming backend doesn't return it or confirms it
                setIsAuthenticated(true);
                redirectToDashboard(selectedRole);
                setIsLoading(false);
                return { success: true };
            } else {
                setIsLoading(false);
                return { success: false, message: responseData.message || "SignUp successful, but no token received." };
            }
        } catch (err) {
            console.error("Login API error:", err);
            setIsLoading(false);
            let errorMessage = "An error occurred during login. Please try again later.";
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            } else if (err.request) {
                errorMessage = "No response from server. Please check your network connection.";
            } else if (err.message) {
                // For other errors (e.g., network issues before request is sent, or errors in setting up the request)
                errorMessage = err.message;
            }
            // Clear any potentially partially set auth state on error
            setUserToken(null);
            setUserRole(null);
            setIsAuthenticated(false);
            return { success: false, message: errorMessage };
        }
    };

    const logoutAction = () => {
        setUserToken(null);
        setUserRole(null);
        setIsAuthenticated(false);
        // localStorage items are removed by the useEffect hook when userToken becomes null
        navigate('/login');
    };

    // Effect to check auth on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole'); // Use consistent key
        if (token && role) {
            setUserToken(token);
            setUserRole(role);
            setIsAuthenticated(true);
            axios.defaults.headers.common['x-auth-token'] = token;
            // Optional: redirect if already logged in and not on a protected page,
            // but be careful with initial render paths.
            // if (!['/student', '/organizer', '/judge'].includes(window.location.pathname) && window.location.pathname !== '/login') {
            // redirectToDashboard(role);
            // }
        }
    }, [navigate]); // `Maps` can be a dependency if redirection logic on load is complex


    return (
        <AuthContext.Provider value={{
            userToken,
            userRole,
            isAuthenticated,
            isLoading, // Expose global loading state
            loginAction,
            signupAction,
            logoutAction,
            redirectToDashboard
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};