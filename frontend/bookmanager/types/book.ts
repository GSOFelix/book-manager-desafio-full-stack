// Model
export interface Book {
    id: string;
    title: string;
    author: string;
    year?: number;
    description?: string
    createdAt: string;
    updatedAt: string;
}

// Requests
export interface CreateBookRequest {
    title: string;
    author: string;
    year?: number;
    description?: string
}

export interface UpdateBookRequest {
    title?: string;
    author?: string;
    year?: number;
    description?: string
}

// Responses
export interface ListBooksResponse {
    books: Book[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ListBooksParams {
    page: number;
    pageSize: number;
    title?: string;
}