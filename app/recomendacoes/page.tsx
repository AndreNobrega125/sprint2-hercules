'use client';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import { trechos } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { StatusVegetacao } from '@/lib/types';
import { CheckCircle2, AlertTriangle, Clock, ArrowRight, Home } from 'lucide-react';

const recomendacoes: Record<StatusVegetacao, { titulo: string; acoes: string[]; prazo: string; prioridade: string; corBg: string; corBorder: string; corText: string }> = {
  ok: {
    titulo: 'Nenhuma ação imediata necessária',
    acoes: [
      'Manter monitoramento padrão a cada 15 dias',
      'Registrar próxima vistoria programada',
      'Verificar conformidade com cronograma anual de roçada',
    ],
    prazo: 'Próxima vistoria em 15 dias',
    prioridade: 'Baixa',
    corBg: 'bg-green-50',
    corBorder: 'border-green-300',
    corText: 'text-green-700',
  },
  atencao: {
    titulo: 'Agendar roçada preventiva',
    acoes: [
      'Notificar equipe de conservação para agendamento',
      'Agendar roçada preventiva em até 15 dias',
      'Aumentar frequência de monitoramento para semanal',
      'Registrar evidências fotográficas semanalmente',
    ],
    prazo: 'Roçada em até 15 dias',
    prioridade: 'Média',
    corBg: 'bg-yellow-50',
    corBorder: 'border-yellow-300',
    corText: 'text-yellow-700',
  },
  critico: {
    titulo: 'Roçada imediata — Risco regulatório',
    acoes: [
      'Acionar equipe de roçada com prioridade máxima',
      'Notificar supervisor regional imediatamente',
      'Registrar ocorrência no sistema de gestão da Motiva',
      'Realizar roçada em até 48 horas',
      'Documentar com fotos antes e após a intervenção',
    ],
    prazo: 'Ação em até 48 horas',
    prioridade: 'Máxima — Urgente',
    corBg: 'bg-red-50',
    corBorder: 'border-red-300',
    corText: 'text-red-700',
  },
};

function RecomendacoesContent() {
  const router = useRouter();
  const params = useSearchParams();
  const trecho = params.get('trecho') ?? '';
  const fiscal = params.get('fiscal') ?? '';
  const altura = Number(params.get('altura') ?? 0);
  const status = (params.get('status') ?? 'ok') as StatusVegetacao;

  const trechoObj = trechos.find(t => t.id === trecho);
  const rec = recomendacoes[status];
  const Icon = status === 'critico' ? AlertTriangle : status === 'atencao' ? Clock : CheckCircle2;

  function finalizar() {
    router.push('/relatorio?novo=1');
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <AppHeader title="Recomendação" back={`/vistoria/classificacao?trecho=${trecho}`} subtitle="Passo 4 de 4 — Resultado da vistoria" />
      <div className="px-4 py-5 flex flex-col gap-4">

        {/* Progresso completo */}
        <div className="flex gap-1">
          {[1,2,3,4].map(n => (
            <div key={n} className="flex-1 h-1.5 rounded-full bg-green-600" />
          ))}
        </div>

        {/* Resultado */}
        <div className={`${rec.corBg} border ${rec.corBorder} rounded-2xl p-5`}>
          <div className="flex items-start gap-3 mb-3">
            <Icon size={24} className={`${rec.corText} shrink-0`} />
            <div>
              <p className={`text-sm font-bold ${rec.corText}`}>{rec.titulo}</p>
              {trechoObj && (
                <p className="text-xs text-gray-500 mt-0.5">{trechoObj.codigo} · {altura} cm</p>
              )}
            </div>
            <StatusBadge status={status} />
          </div>

          <div className={`text-xs ${rec.corText} font-medium mb-1`}>⏱ {rec.prazo}</div>
          <div className={`text-xs ${rec.corText}`}>Prioridade: <strong>{rec.prioridade}</strong></div>
        </div>

        {/* Ações recomendadas */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Ações Recomendadas</p>
          <div className="flex flex-col gap-2">
            {rec.acoes.map((acao, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <ArrowRight size={14} className="text-green-600 shrink-0 mt-0.5" />
                <span>{acao}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo da vistoria */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resumo da Vistoria</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><p className="text-gray-400">Trecho</p><p className="font-semibold text-gray-700">{trechoObj?.codigo ?? '—'}</p></div>
            <div><p className="text-gray-400">Fiscal</p><p className="font-semibold text-gray-700">{fiscal}</p></div>
            <div><p className="text-gray-400">Altura</p><p className="font-semibold text-gray-700">{altura} cm</p></div>
            <div><p className="text-gray-400">Data</p><p className="font-semibold text-gray-700">12/05/2026</p></div>
          </div>
        </div>

        <button
          onClick={finalizar}
          className="text-white rounded-2xl py-4 font-bold text-sm shadow-md flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(to right, rgb(136,135,243), rgb(68,185,252))' }}
        >
          <CheckCircle2 size={18} />
          Concluir e Ver Relatório
        </button>

        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center justify-center gap-2 text-sm text-gray-500 py-2"
        >
          <Home size={16} />
          Voltar ao início
        </button>
      </div>
    </div>
  );
}

export default function RecomendacoesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Carregando...</div>}>
      <RecomendacoesContent />
    </Suspense>
  );
}
