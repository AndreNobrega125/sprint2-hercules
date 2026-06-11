'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import { trechos } from '@/lib/mock-data';

const trechosPriorizados = [...trechos].sort((a, b) => b.altura_cm - a.altura_cm);
import { MapPin } from 'lucide-react';

function VistoriaContent() {
  const router = useRouter();
  const params = useSearchParams();
  const preSelected = params.get('trecho') ?? '';

  const [trechoId, setTrechoId] = useState(preSelected);
  const [fiscal, setFiscal] = useState('João Silva');
  const [obs, setObs] = useState('');
  const [erro, setErro] = useState('');

  function avancar(e: React.FormEvent) {
    e.preventDefault();
    if (!trechoId) { setErro('Selecione um trecho.'); return; }
    router.push(`/vistoria/foto?trecho=${trechoId}&fiscal=${encodeURIComponent(fiscal)}&obs=${encodeURIComponent(obs)}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <AppHeader title="Nova Vistoria" back="/dashboard" subtitle="Passo 1 de 4 — Identificação" />
      <div className="px-4 py-5 flex flex-col gap-4">

        {/* Progresso */}
        <div className="flex gap-1">
          {[1,2,3,4].map(n => (
            <div key={n} className={`flex-1 h-1.5 rounded-full ${n === 1 ? 'bg-green-600' : 'bg-gray-200'}`} />
          ))}
        </div>

        <form onSubmit={avancar} className="flex flex-col gap-4">
          {/* Trecho */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Trecho Vistoriado</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(136,135,243)]" />
              <select
                value={trechoId}
                onChange={e => setTrechoId(e.target.value)}
                className="w-full border border-gray-300 rounded-xl pl-9 pr-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[rgb(136,135,243)] appearance-none"
              >
                <option value="">Selecione o trecho...</option>
                {trechosPriorizados.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.status === 'critico' ? '🔴' : t.status === 'atencao' ? '🟡' : '🟢'} {t.codigo} — {t.municipio} ({t.altura_cm} cm)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fiscal */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Fiscal Responsável</label>
            <input
              type="text"
              value={fiscal}
              onChange={e => setFiscal(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[rgb(136,135,243)]"
            />
          </div>

          {/* Observações */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Observações Iniciais</label>
            <textarea
              value={obs}
              onChange={e => setObs(e.target.value)}
              rows={3}
              placeholder="Descreva condições gerais do trecho..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[rgb(136,135,243)] resize-none"
            />
          </div>

          {erro && <p className="text-red-500 text-xs">{erro}</p>}

          <button
            type="submit"
            className="text-white rounded-2xl py-4 font-bold text-sm shadow-md"
            style={{ background: 'linear-gradient(to right, rgb(100,99,220), rgb(136,135,243))' }}
          >
            Avançar — Registrar Foto
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VistoriaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Carregando...</div>}>
      <VistoriaContent />
    </Suspense>
  );
}
