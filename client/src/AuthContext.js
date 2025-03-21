import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./hooks/useUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const { Logout,FetchUser } = useUser();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
        
            if (token) {
              try {
                FetchUser(); 
                setAuth(true);
              } catch (error) {
                console.warn("Token expired. Trying refresh...");
              }
            } else {
              setAuth(false);
            }
        };
            checkAuth();
    }, []);

    const loginHandle = (token) => {
        localStorage.setItem("access_token", token);
        setAuth(true);
    };

    const logoutHandle = async () => {
        await Logout();
        localStorage.removeItem("access_token");
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ auth, loginHandle, logoutHandle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
