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
				return err.response.data;
			}

			return { error: 'Sistema de autenticação indisponível' };
		});
}
