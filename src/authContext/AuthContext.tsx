import React, { createContext, useContext, useState } from "react";

type AuthUser = {
    name: string,
    id: string
}

type AuthContext = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    isAuthenticated: boolean
    setUser: React.Dispatch<React.SetStateAction<AuthUser | undefined>>,
    user: AuthUser | undefined
}

const AuthContext = createContext<AuthContext>({
    setIsAuthenticated: () => { },
    isAuthenticated: false,
    setUser: () => { },
    user: undefined
});


export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthUser | undefined>(undefined);

    return (
        <AuthContext.Provider value={{ setIsAuthenticated, isAuthenticated, setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};