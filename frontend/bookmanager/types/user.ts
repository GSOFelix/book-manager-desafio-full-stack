// Model
export interface User {
  id: string;
  name: string;
  email: string;
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
  access_token: string;
  user: User;
}

export interface CreateUserResponse {
  user:User
  access_token: string;
}