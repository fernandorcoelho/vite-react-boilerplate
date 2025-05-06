import { useState } from 'react';
import httpClient from '@/services/httpClient';
import { isAxiosError } from 'axios';

interface LoginData {
	email: string;
	password: string;
}

export function useAuth() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function login({ email, password }: LoginData) {
		setLoading(true);
		setError(null);
		try {
			const response = await httpClient.post<{ token: string }>('/auth/login', {
				email,
				password,
			});
			localStorage.setItem('token', response.data.token);
			// Aqui você pode redirecionar ou atualizar o contexto de autenticação
		} catch (err: unknown) {
			if (isAxiosError(err)) {
				setError(err.response?.data?.message ?? 'Erro ao fazer login');
			}
		} finally {
			setLoading(false);
		}
	}

	function logout() {
		localStorage.removeItem('token');
		// Atualize o contexto de autenticação se necessário
	}

	return { login, logout, loading, error };
}
