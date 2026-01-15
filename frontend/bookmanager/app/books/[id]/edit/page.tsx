'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BooksApi } from '@/lib/api';
import BookForm from '@/components/BookForm';
import { Book, UpdateBookRequest } from '@/types/book';
import { toastSuccess } from '@/util/toast';

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initial, setInitial] = useState<Book  | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await BooksApi.get(id);
        setInitial(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar livro');
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const onSubmit = async (payload: UpdateBookRequest) => {
    setError('');
    setSubmitting(true);
    try {
      await BooksApi.update(id, payload);
      toastSuccess('Livro atualizado com sucesso');
      router.replace('/books');
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar alterações');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-green-300/80">Carregando...</div>;
  }

  if (!initial) {
    return <div  className="text-red-500">Livro não encontrado.</div>;
  }

  return (
    <div className="bg-neutral-900 border border-green-700/40 rounded-xl shadow-lg shadow-green-900/20 p-5">
      <h1  className="text-lg font-semibold mb-4 text-green-300">Editar livro</h1>
      <BookForm initialValues={initial} onSubmit={onSubmit} submitting={submitting} />
      {error && <p  className="text-sm text-green-400 mt-3">{error}</p>}
    </div>
  );
}