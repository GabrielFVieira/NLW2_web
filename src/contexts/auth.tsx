import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

export interface User {
    id: string,
    email: string,
    password: string,
    name: string,
    surname: string,
    bio?: string,
    whatsapp?: string,
    avatar?: string,
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    //loading: boolean;
    signIn(email: string, password: string, remember: boolean): Promise<any>;
    signOut(): void;
}

interface AuthErrorResponse {
    error?: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    //const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const storagedUser = localStorage.getItem('@PAuth:user');
        const storagedToken = localStorage.getItem('@PAuth:token');

        if(storagedUser && storagedToken) {
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

            setUser(JSON.parse(storagedUser));
            //setLoading(false);
        }
    }, []);

    async function signIn(email: string, password: string, remember: boolean): Promise<any> {
        const response = await auth.signIn(email, password);

        if(response.error) {
            return response;
        }

        setUser(response.user)

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        if(remember) {
            localStorage.setItem('@PAuth:user', JSON.stringify(response.user));
            localStorage.setItem('@PAuth:token', response.token);
        }
    }

    function signOut() {
        localStorage.clear();
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user/*, loading*/, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}