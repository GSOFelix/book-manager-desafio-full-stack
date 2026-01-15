'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BooksApi } from '@/lib/api';
import { Book, ListBooksParams } from '@/types/book';
import Pagination from '@/components/Pagination';
import { confirmDelete } from '@/util/sweetAlert';
import { toastSuccess } from '@/util/toast';

export default function BooksListPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    } | null>(null);

    const [openBookId, setOpenBookId] = useState<string | null>(null);

    const toggleBook = (id: string) => {
        setOpenBookId(prev => (prev === id ? null : id));
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: ListBooksParams = { page, title: search };

            const res = await BooksApi.list(params);
            setItems(res.data || []);
            setMeta(res.meta);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [search, page]);

    const handleDelete = async (id: string) => {
        const confirmed = await confirmDelete('Tem certeza que deseja excluir este livro?');
        if (!confirmed) return;

        try {
            await BooksApi.remove(id);
            setItems(prevItems => prevItems.filter(b => b.id !== id));
            toastSuccess('Livro excluído com sucesso');
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Erro ao excluir');
        }
    };

    

    return (
        <div className="space-y-4">

            {/* Search */}
            <div className="flex justify-start">
                <input
                    type="text"
                    placeholder="Pesquisar por título..."
                    className="w-full max-w-md rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
                    value={search}
                    onChange={e => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />
            </div>

            {/* MOBILE  */}
            <div className="space-y-4 md:hidden">
                {loading ? (
                    <div className="text-center text-green-300/80 py-6">
                        Carregando...
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center text-green-300/80 py-6">
                        Nenhum livro encontrado.
                    </div>
                ) : (
                    items.map(b => (
                        <div
                            key={b.id}
                            className="bg-neutral-900 border border-green-700/40 rounded-xl p-4 shadow shadow-green-900/20"
                        >
                            <button
                                onClick={() => toggleBook(b.id)}
                                className="w-full flex justify-between items-center text-emerald-300 font-semibold text-lg"
                            >
                                {b.title}
                                <span className="text-sm">
                                    {openBookId === b.id ? "▲" : "▼"}
                                </span>
                            </button>

                            <p className="text-sm text-green-200/70 mt-1">
                                <span className="font-medium">Autor:</span> {b.author}
                            </p>

                            <p className="text-sm text-green-200/70">
                                <span className="font-medium">Ano:</span> {b.year ?? "-"}
                            </p>

                            {openBookId === b.id && (
                                <div className="mt-3 pt-3 border-t border-green-700/40 text-sm text-green-200/80">
                                    {b.description || "Sem descrição"}
                                </div>
                            )}

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => router.push(`/books/${b.id}/edit`)}
                                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 hover:bg-neutral-800"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(b.id)}
                                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))
                )}

                <Pagination
                    page={meta?.page ?? 1}
                    totalPages={meta?.totalPages ?? 1}
                    onPrev={() => {
                        if (meta?.hasPreviousPage) setPage(p => p - 1);
                    }}
                    onNext={() => {
                        if (meta?.hasNextPage) setPage(p => p + 1);
                    }}
                />
            </div>

            {/*  DESKTOP */}
            <div className="hidden md:block bg-neutral-900 border border-green-700/40 rounded-xl shadow-lg shadow-green-900/20 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-neutral-950">
                        <tr>
                            <th className="text-left text-sm text-green-300 font-medium border-b border-green-700/40 px-4 py-3">
                                Título
                            </th>
                            <th className="text-left text-sm text-green-300 font-medium border-b border-green-700/40 px-4 py-3">
                                Autor
                            </th>
                            <th className="text-left text-sm text-green-300 font-medium border-b border-green-700/40 px-4 py-3">
                                Ano
                            </th>
                            <th className="text-left text-sm text-green-300 font-medium border-b border-green-700/40 px-4 py-3 w-44">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-green-300/80">
                                    Carregando...
                                </td>
                            </tr>
                        ) : items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-green-300/80">
                                    Nenhum livro encontrado.
                                </td>
                            </tr>
                        ) : (
                            items.map(b => (
                                <>
                                    <tr
                                        key={b.id}
                                        className="border-t border-green-700/40 hover:bg-neutral-800"
                                    >
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleBook(b.id)}
                                                className="flex items-center gap-2 text-emerald-300 hover:underline font-semibold"
                                            >
                                                {b.title}
                                                <span className="text-xs">
                                                    {openBookId === b.id ? "▲" : "▼"}
                                                </span>
                                            </button>
                                        </td>

                                        <td className="px-4 py-3">{b.author}</td>
                                        <td className="px-4 py-3">{b.year ?? "-"}</td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => router.push(`/books/${b.id}/edit`)}
                                                    className="px-3 py-1.5 text-sm rounded-lg border border-green-700/40 bg-neutral-900 text-green-100 hover:bg-neutral-800"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(b.id)}
                                                    className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {openBookId === b.id && (
                                        <tr className="bg-neutral-950">
                                            <td
                                                colSpan={4}
                                                className="px-6 py-4 text-sm text-green-200/80 border-t border-green-700/40"
                                            >
                                                {b.description || "Sem descrição"}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))
                        )}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={4} className="border-t border-green-700/40">
                                <Pagination
                                    page={meta?.page ?? 1}
                                    totalPages={meta?.totalPages ?? 1}
                                    onPrev={() => {
                                        if (meta?.hasPreviousPage) setPage(p => p - 1);
                                    }}
                                    onNext={() => {
                                        if (meta?.hasNextPage) setPage(p => p + 1);
                                    }}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}