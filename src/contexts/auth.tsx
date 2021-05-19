import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

export interface User {
	id: string;
	email: string;
	name: string;
	surname: string;
	bio?: string;
	whatsapp?: string;
	avatar?: string;
}

interface AuthContextData {
	signed: boolean;
	user: User | null;
	signIn(email: string, password: string, remember: boolean): Promise<any>;
	signOut(): void;
	recovery(email: string): Promise<any>;
	updateUser(newUser: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storagedUser = localStorage.getItem('@PAuth:user');
		const storagedToken = localStorage.getItem('@PAuth:token');

		if (storagedUser && storagedToken) {
			api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

			setUser(JSON.parse(storagedUser));
		}
	}, []);

	async function signIn(email: string, password: string, remember: boolean): Promise<any> {
		const response = await auth.signIn(email, password);

		if (response.error) {
			return response;
		}

		if (response.user) {
			setUser(response.user);

			api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

			if (remember) {
				localStorage.setItem('@PAuth:user', JSON.stringify(response.user));
				localStorage.setItem('@PAuth:token', response.token);
			}
		}
	}

	function signOut() {
		localStorage.clear();
		setUser(null);
	}

	async function recovery(email: string): Promise<any> {
		return await auth.recovery(email);
	}

	function updateUser(newUser: User) {
		if (newUser.id === user?.id) {
			setUser(newUser);

			const storagedUser = localStorage.getItem('@PAuth:user');
			if (storagedUser) {
				localStorage.setItem('@PAuth:user', JSON.stringify(newUser));
			}
		}
	}

	return (
		<AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, recovery, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return useContext(AuthContext);
}
