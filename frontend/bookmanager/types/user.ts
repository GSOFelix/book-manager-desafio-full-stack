// Model
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Requests
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest{
    email:string;
    password:string
}

// Responses
export interface LoginResponse {
  token: string;
  user: User;
}