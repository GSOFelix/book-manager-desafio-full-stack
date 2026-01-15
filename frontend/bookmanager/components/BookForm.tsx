'use client';

import { useState } from 'react';
import { Book, CreateBookRequest } from '@/types/book';

interface Props {
  initialValues?: Partial<Book> | null;
  onSubmit: (payload: CreateBookRequest) => void;
  submitting: boolean;
}

export default function BookForm({ initialValues, onSubmit, submitting }: Props) {
  const [form, setForm] = useState<CreateBookRequest>({
    title: initialValues?.title || '',
    author: initialValues?.author || '',
    year: initialValues?.year,
    description: initialValues?.description || '',
  });

  const setField = (k: keyof CreateBookRequest, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: CreateBookRequest = {
      title: form.title.trim(),
      author: form.author.trim(),
      year: form.year || undefined,
      description: form.description?.trim() || '',
    };
    onSubmit(payload);
  };

  return (
    <form  onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label  className="block text-sm text-green-300 mb-1">Título</label>
        <input
          className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
          value={form.title}
          onChange={e => setField('title', e.target.value)}
          required
          placeholder="Ex.: Clean Code"
        />
      </div>
      <div>
        <label  className="block text-sm text-green-300 mb-1">Autor</label>
        <input
          className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
          value={form.author}
          onChange={e => setField('author', e.target.value)}
          required
          placeholder="Ex.: Robert C. Martin"
        />
      </div>
      <div  className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label  className="block text-sm text-green-300 mb-1">Ano</label>
          <input
            type="number"
            className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
            value={form.year ?? ''}
            onChange={e => setField('year', e.target.value ? Number(e.target.value) : null)}
            min={0}
            max={3000}
            placeholder="Ex.: 2008"
          />
        </div>
      </div>
      <div>
        <label  className="block text-sm text-green-300 mb-1">Descrição</label>
        <textarea
          className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
          rows={4}
          value={form.description ?? ''}
          onChange={e => setField('description', e.target.value)}
          placeholder="Breve descrição..."
        />
      </div>

      <div  className="flex justify-end gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-green-600 text-black text-sm hover:bg-green-500 disabled:opacity-50 transition-colors shadow shadow-green-500/30"
        >
          {submitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}