'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!matricula || !senha) { setErro('Preencha matrícula e senha.'); return; }
    setErro('');
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push('/dashboard'); }, 1200);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="w-full max-w-[430px] min-h-screen flex flex-col overflow-hidden"
        style={{ background: 'rgb(101,82,245)' }}
      >
      {/* Topo */}
      <div className="flex flex-col items-center justify-center pt-20 pb-10 px-6">
        <Image src="/logomotiva.png" alt="Motiva" width={80} height={80} priority className="mb-4 rounded-2xl" />
        <p className="text-sm mt-1 text-center" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Monitoramento Inteligente de Vegetação
        </p>
      </div>

      {/* Card de login */}
      <div className="bg-white rounded-3xl mx-4 mb-6 px-6 pt-8 pb-10 shadow-xl">
        <h2 className="text-gray-800 text-xl font-bold mb-1">Acesso Fiscal</h2>
        <p className="text-gray-400 text-sm mb-6">Entre com sua matrícula e senha corporativa.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Matrícula</label>
            <input
              type="text"
              placeholder="Ex.: MOT-00123"
              value={matricula}
              onChange={e => setMatricula(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-gray-50 outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'rgb(136,135,243)' } as React.CSSProperties}
              onFocus={e => (e.target.style.boxShadow = '0 0 0 2px rgb(136,135,243)')}
              onBlur={e => (e.target.style.boxShadow = '')}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Senha</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-gray-50 outline-none pr-12"
                onFocus={e => (e.target.style.boxShadow = '0 0 0 2px rgb(136,135,243)')}
                onBlur={e => (e.target.style.boxShadow = '')}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {erro && <p className="text-red-500 text-xs">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className="text-white rounded-xl py-3 font-bold text-sm mt-2 disabled:opacity-60 transition"
            style={{ background: 'linear-gradient(to right, rgb(100,99,220), rgb(136,135,243))' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Problemas de acesso? Contate o suporte técnico Motiva.
        </p>
      </div>
      </div>
    </div>
  );
}
