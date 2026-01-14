'use client';
import { AuthApi } from "@/lib/api";
import { getUser, isAuthenticated, setSession } from "@/lib/storage";
import { CreateUserRequest, LoginRequest } from "@/types/user";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const MODE={
  login:'login',
  register:'register'
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState(MODE.login); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/books');
    }
  }, [router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loginData : LoginRequest= {
        email: email.trim(),
        password
      }

      const res = await AuthApi.login(loginData);
      // Espera token e user do backend
      setSession(res.access_token, res.user);
      const userStorage = getUser();
      console.log(res);
    } catch (err:any) {
      setError(err.message || 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const registerData: CreateUserRequest = {name,email,password};
      const res = await AuthApi.register(registerData);
      setSession(res.access_token, res.user);
      console.log(res)
    } catch (err:any) {
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="max-w-4xl mx-auto px-4 py-10 min-h-screen bg-black text-green-100">
      <div className="text-5xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-600 bg-[length:200%_200%] animate-[gradientMove_8s_ease_infinite] bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_14px_rgba(16,185,129,0.45)] relative after:content-[''] after:block after:w-28 after:h-[3px] after:bg-emerald-500/70 after:mx-auto after:mt-2 after:rounded-full">
        BookManager
      </div>

      <div  className="max-w-md mx-auto">
        <div className="bg-neutral-900 border border-green-700/40 shadow-lg shadow-green-900/20 rounded-xl p-5">
          {mode === MODE.login ? (
            <>
              <h2  className="text-lg font-semibold mb-4 text-green-300">Entrar</h2>
              <form  onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label  className="block text-sm text-green-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label  className="block text-sm text-green-300 mb-1">Senha</label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-green-600 text-black text-sm hover:bg-green-500 disabled:opacity-50 transition-colors shadow shadow-green-500/30"
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
              {error && <p  className="text-sm text-green-400 mt-3">{error}</p>}
              <p className="text-sm text-green-300/80 mt-3">
                Não tem conta?{' '}
                <button  className="text-green-400 hover:text-green-300 underline decoration-green-500" onClick={() => { setMode(MODE.register); setError(''); }}>
                  Cadastrar novo usuário
                </button>
              </p>
            </>
          ) : (
            <>
              <h2  className="text-lg font-semibold mb-4 text-green-300">Cadastrar Usuário</h2>
              <form  onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label  className="block text-sm text-green-300 mb-1">Nome</label>
                  <input
                    className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label  className="block text-sm text-green-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label  className="block text-sm text-green-300 mb-1">Senha</label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-green-700/40 bg-neutral-950 text-green-100 px-3 py-2 placeholder-green-400/50 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/40"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-green-600 text-black text-sm hover:bg-green-500 disabled:opacity-50 transition-colors shadow shadow-green-500/30"
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </form>
              {error && <p  className="text-sm text-green-400 mt-3">{error}</p>}
              <p className="text-sm text-green-300/80 mt-3">
                Já tem conta?{' '}
                <button  className="text-[#ffffff] hover:text-green-300 underline decoration-[#ffffff]" onClick={() => { setMode(MODE.login); setError(''); }}>
                  Voltar para login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}