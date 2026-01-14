import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse } from "@/types/user";
import { clearSession, getToken } from "./storage";
import { CreateBookRequest, ListBooksParams, UpdateBookRequest } from "@/types/book";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API;

// Criar instância do Axios
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const errorData = error.response?.data as { message?: string } | undefined;
        const errorMessage = errorData?.message || error.message || 'Erro na requisição';

        if (error.response?.status === 401) {
            clearSession();
            throw new Error(errorMessage);
        }

        // Extrair mensagem de erro
        
        throw new Error(errorMessage);
    }
);

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    params?: Record<string, string | number | undefined>;
}

async function request<T = unknown>(path: string, { method = 'GET', body, params, }: RequestOptions = {}) {
    const config: AxiosRequestConfig = {
        method,
        url: path,
        data: body,
        params: params ? Object.fromEntries(
            Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
        ) : undefined,
    };

    const response = await api.request<T>(config);
    return response.data;
}

export const AuthApi = {
    login: (data: LoginRequest):Promise<LoginResponse> =>
        request('/auth/login',
            {
                method: 'POST',
                body: data
            }),
    register: (data: CreateUserRequest):Promise<CreateUserResponse> =>
        request('/auth/register', {
            method: 'POST',
            body: data
        }),
};

export const BooksApi = {
    list: ({ page, pageSize, title }: ListBooksParams) =>
        request('/books', {params: { page, pageSize, title }}),

    create: (data: CreateBookRequest) =>
        request('/books/create', { method: 'POST', body: data }),

    get: (id: string) =>
        request(`/books/${id}`),

    update: (id: string, data: UpdateBookRequest) =>
        request(`/books/${id}`, { method: 'PUT', body: data }),
        
    remove: (id: string) =>
        request(`/books/${id}`, { method: 'DELETE' }),

}