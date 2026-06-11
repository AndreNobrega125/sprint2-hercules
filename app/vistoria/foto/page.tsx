'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import { Camera, ImagePlus, CheckCircle2 } from 'lucide-react';

function FotoContent() {
  const router = useRouter();
  const params = useSearchParams();
  const trecho = params.get('trecho') ?? '';
  const fiscal = params.get('fiscal') ?? '';
  const obs = params.get('obs') ?? '';

  const [fotoSimulada, setFotoSimulada] = useState(false);

  function simularFoto() {
    setFotoSimulada(true);
  }

  function avancar() {
    router.push(`/vistoria/classificacao?trecho=${trecho}&fiscal=${encodeURIComponent(fiscal)}&obs=${encodeURIComponent(obs)}&foto=1`);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <AppHeader title="Registrar Foto" back="/vistoria" subtitle="Passo 2 de 4 — Evidência fotográfica" />
      <div className="px-4 py-5 flex flex-col gap-4">

        {/* Progresso */}
        <div className="flex gap-1">
          {[1,2,3,4].map(n => (
            <div key={n} className={`flex-1 h-1.5 rounded-full ${n <= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
          ))}
        </div>

        {/* Área de câmera simulada */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-500 mb-3">Fotografia da Vegetação</p>

          {!fotoSimulada ? (
            <div className="bg-gray-100 rounded-xl h-52 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300">
              <Camera size={40} className="text-gray-400" />
              <p className="text-sm text-gray-400 text-center px-4">
                Use a câmera ou selecione uma imagem com a estaca de referência visível
              </p>
            </div>
          ) : (
            <div className="bg-green-50 rounded-xl h-52 flex flex-col items-center justify-center gap-2 border-2 border-green-300 relative overflow-hidden">
              {/* Simulação de foto */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-200 to-green-400 opacity-60" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <CheckCircle2 size={36} className="text-green-700" />
                <p className="text-sm font-semibold text-green-800">Foto registrada</p>
                <p className="text-xs text-green-700">12/05/2026 · 10:34</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-3">
            <button
              onClick={simularFoto}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
              style={{ background: 'rgb(136,135,243)' }}
            >
              <Camera size={16} />
              Câmera
            </button>
            <button
              onClick={simularFoto}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 rounded-xl py-3 text-sm font-semibold active:bg-gray-50"
            >
              <ImagePlus size={16} />
              Galeria
            </button>
          </div>
        </div>

        {/* Orientação */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-yellow-700 mb-1">Orientação para foto</p>
          <ul className="text-xs text-yellow-700 list-disc pl-4 space-y-1">
            <li>Posicione-se perpendicular à vegetação</li>
            <li>Certifique-se que a estaca de referência está visível</li>
            <li>Inclua a faixa de domínio completa no enquadramento</li>
          </ul>
        </div>

        <button
          onClick={avancar}
          disabled={!fotoSimulada}
          className="text-white rounded-2xl py-4 font-bold text-sm shadow-md disabled:opacity-40"
          style={{ background: 'linear-gradient(to right, rgb(100,99,220), rgb(136,135,243))' }}
        >
          Avançar — Informar Altura
        </button>

        {!fotoSimulada && (
          <button onClick={avancar} className="text-center text-xs text-gray-400 underline">
            Pular etapa (sem foto)
          </button>
        )}
      </div>
    </div>
  );
}

export default function FotoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Carregando...</div>}>
      <FotoContent />
    </Suspense>
  );
}
