"use client";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const authContext = createContext();

export function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            Cookies.set("token", data.token);
            setUser(data)
            console.log('login successfully:', data);

        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
    }

    return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}
        </authContext.Provider>
    );
}