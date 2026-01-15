'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BooksApi } from '@/lib/api';
import BookForm from '@/components/BookForm';
import { CreateBookRequest } from '@/types/book';

export default function NewBookPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (payload: CreateBookRequest) => {
        setError('');
        setSubmitting(true);
        try {
            await BooksApi.create(payload);
            router.replace('/books');
        } catch (err: any) {
            setError(err.message || 'Erro ao criar livro');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="mb-3 inline-flex items-center gap-2 rounded-lg border border-green-700/40 bg-neutral-900 text-green-100 px-3 py-2 text-sm hover:bg-neutral-800 transition-colors"
            >
                ← Voltar
            </button>
        <div className="bg-neutral-900 border border-green-700/40 rounded-xl shadow-lg shadow-green-900/20 p-5">
            <h1 className="text-lg font-semibold mb-4 text-green-300">Cadastrar novo livro</h1>
            <BookForm onSubmit={onSubmit} submitting={submitting} />
            {error && <p className="text-sm text-green-400 mt-3">{error}</p>}
        </div>
        </div>
    );
}