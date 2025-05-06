import axios, { type AxiosInstance } from 'axios';

// Cria uma instância do Axios com configurações padrão
const httpClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Usa variável de ambiente para flexibilidade
	timeout: 10000, // Tempo limite de 10 segundos
	headers: {
		'Content-Type': 'application/json',
	},
});

// Interceptor para tratar erros de resposta globalmente
httpClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Tratamento básico de erros
		if (error.response) {
			// Erro retornado pelo servidor
			console.error('Erro de resposta:', error.response.data);
		} else if (error.request) {
			// Sem resposta do servidor
			console.error('Sem resposta do servidor:', error.request);
		} else {
			// Erro na configuração da requisição
			console.error('Erro na configuração:', error.message);
		}
		return Promise.reject(error);
	},
);

httpClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token'); // Ou use outro storage/context
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export default httpClient;
