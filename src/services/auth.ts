import { User } from '../contexts/auth';
import api from './api';

export interface Response {
	token: string;
	user: User;
}

export function signIn(email: string, password: string): Promise<any> {
	return api
		.post('auth', { email, password })
		.then(response => response.data as Response)
		.catch(err => {
			if (err.response) {
				throw new Error(err.response.data.error);
			}
			throw new Error('Sistema de autenticação indisponível');
		});
}

export function recovery(email: string): Promise<any> {
	return api
		.post('recovery', { email, recoveryPage: window.location.href })
		.then(response => response.data)
		.catch(err => {
			if (err.response) {
				throw new Error(err.response.data.error);
			}

			throw new Error('Sistema de recuperação indisponível');
		});
}
