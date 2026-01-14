'use client';

import { CreateUserRequest, LoginRequest } from "@/types/user";
import { clearSession, getToken } from "./storage";
import { CreateBookRequest, ListBooksParams, UpdateBookRequest } from "@/types/book";

const BASE_URL = process.env.NEXT_PUBLIC_API;

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    params?: Record<string, string | number | undefined>;
}
async function request(path: string, { method = 'GET', body, params, }: RequestOptions = {}) {
    // montar url
    const url = new URL(path, BASE_URL);
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
        });
    }

    //definir hearder
    const hearders: Record<string, string> = { 'Content-Type': 'application/json' };
    // recupera token
    const token = getToken();
    //adiciona token
    if (token) hearders['Authorization'] = `Bearer ${token}`;

    // faz a requisição
    const res = await fetch(url.toString(), {
        method,
        headers: hearders,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'omit'
    });

    if (res.status === 401) {
        clearSession();
        throw new Error('Não autorizado');
    }

    const isJson = res.headers.get('Content-Type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
        const msg = isJson ? data?.messsage || 'Erro na requisição' : 'Erro na requisição';
        throw new Error(msg);
    }

    return data;

}

export const AuthApi = {
    login: (data: LoginRequest) =>
        request('/auth/login',
            {
                method: 'POST',
                body: data
            }),
    register: (data: CreateUserRequest) =>
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