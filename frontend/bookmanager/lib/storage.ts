'use client';

import { User } from "@/types/user";

const TOKEN_KEY = 'bm_token';
const USER_KEY = 'bm_user';

export function setSession(token:string,user:User){
    localStorage.setItem(TOKEN_KEY,token);
    localStorage.setItem(USER_KEY,JSON.stringify(user))
}

export function getToken(){
    if(typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser(){
    if(typeof window === 'undefined') return null;
    const rawUser = localStorage.getItem(USER_KEY);
    return rawUser ? JSON.parse(rawUser): null;
}

export function clearSession(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(){
    return !!getToken()
}