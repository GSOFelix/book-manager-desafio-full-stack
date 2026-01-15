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
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ListBooksParams {
    page: number;
    title?: string;
}