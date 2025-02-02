"use client";

import React, {createContext, useState, useContext, ReactNode} from "react";
import {useRouter} from "next/navigation";
import {loginUser, logoutUser} from "@/lib/api/auth";

// Define AuthContext type
type AuthContextType = {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signedIn: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const router = useRouter();

    const login = async (name: string, email: string) => {
        try {
            
            await loginUser({name, email});
            setSignedIn(true);

            // router.push("/account");
            await new Promise(resolve => setTimeout(resolve, 100))
            // return
            router.refresh() 
            router.replace("/account");
        } catch (error) {
            console.error("Login error:", error);
            
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await logoutUser();
            setSignedIn(false);
            router.replace("/"); 
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{login, logout, signedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
