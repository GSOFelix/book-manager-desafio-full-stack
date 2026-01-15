'use client';
import { clearSession, getUser, } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Topbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setUser(getUser());
    }, []);
    const onLogout = () => {
        clearSession();
        router.replace('/login');
    };

    if (!mounted) return null;

    return (
        <header className="bg-neutral-950 border-b border-green-700/40 shadow-lg shadow-green-900/20">

            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-600 bg-clip-text text-transparent tracking-tight">
                    BookManager
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto sm:items-center">
                    <button
                        onClick={() => router.push('/books/new')}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 text-black px-3 py-2 text-sm hover:bg-green-500 transition-colors shadow shadow-green-500/30 w-full sm:w-auto"
                        aria-label="Cadastrar novo livro"
                    >
                        <span className="sm:hidden">Novo</span>
                        <span className="hidden sm:inline">Cadastrar novo livro</span>
                    </button>

                    <button
                        onClick={onLogout}
                        className="inline-flex items-center justify-center rounded-lg border border-green-700/40 bg-neutral-900 text-green-100 px-3 py-2 text-sm hover:bg-neutral-800 transition-colors w-full sm:w-auto"
                    >
                        Sair
                    </button>

                    {user && (
                        <span className="hidden md:inline text-sm text-green-300/80">
                            Olá, {user.name}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}