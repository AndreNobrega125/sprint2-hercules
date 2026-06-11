'use client';
import { useState } from 'react';
import MobileShell from '@/components/MobileShell';
import AppHeader from '@/components/AppHeader';
import StatusBadge from '@/components/StatusBadge';
import { trechos, trechosPorDia, diaDaSemanaAbrev } from '@/lib/mock-data';
import Link from 'next/link';
import { ChevronRight, MapPin, Search, Calendar } from 'lucide-react';
import { StatusVegetacao } from '@/lib/types';

type Filtro = 'todos' | StatusVegetacao;

const barColor = (status: StatusVegetacao) =>
  status === 'critico' ? 'bg-red-400' : status === 'atencao' ? 'bg-yellow-400' : 'bg-green-400';

const alturaColor = (h: number) =>
  h > 30 ? 'text-red-500 font-bold' : h > 10 ? 'text-yellow-600 font-bold' : 'text-green-600 font-bold';

const iconBg = (status: StatusVegetacao) =>
  status === 'critico' ? 'bg-red-100' : status === 'atencao' ? 'bg-yellow-100' : 'bg-green-100';

const iconColor = (status: StatusVegetacao) =>
  status === 'critico' ? 'text-red-500' : status === 'atencao' ? 'text-yellow-500' : 'text-green-600';

function TrechoCard({ t }: { t: typeof trechos[0] }) {
  return (
    <Link
      href={`/trechos/${t.id}`}
      className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg(t.status)}`}>
        <MapPin size={18} className={iconColor(t.status)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-bold text-gray-800 truncate">{t.codigo}</span>
          <StatusBadge status={t.status} />
        </div>
        <p className="text-xs text-gray-500 mb-1.5">{t.municipio} · KM {t.km_inicio}–{t.km_fim}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
            <div
              className={`${barColor(t.status)} h-1.5 rounded-full`}
              style={{ width: `${Math.min((t.altura_cm / 50) * 100, 100)}%` }}
            />
          </div>
          <span className={`text-xs shrink-0 ${alturaColor(t.altura_cm)}`}>{t.altura_cm} cm</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">{t.responsavel}</p>
      </div>
      <ChevronRight size={16} className="text-gray-300 shrink-0" />
    </Link>
  );
}

export default function TrechosPage() {
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [busca, setBusca] = useState('');

  const counts = {
    todos:   trechos.length,
    critico: trechos.filter(t => t.status === 'critico').length,
    atencao: trechos.filter(t => t.status === 'atencao').length,
    ok:      trechos.filter(t => t.status === 'ok').length,
  };

  const grupos = trechosPorDia()
    .map(g => ({
      ...g,
      trechos: g.trechos
        .filter(t => filtro === 'todos' || t.status === filtro)
        .filter(t =>
          busca === '' ||
          t.codigo.toLowerCase().includes(busca.toLowerCase()) ||
          t.municipio.toLowerCase().includes(busca.toLowerCase())
        ),
    }))
    .filter(g => g.trechos.length > 0);

  // Badge do dia: se tiver pelo menos 1 crítico → vermelho; atenção → amarelo; só ok → verde
  function badgeDia(grupo: typeof grupos[0]) {
    const temCritico  = grupo.trechos.some(t => t.status === 'critico');
    const temAtencao  = grupo.trechos.some(t => t.status === 'atencao');
    if (temCritico) return 'bg-red-100 text-red-600 border-red-200';
    if (temAtencao) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  }

  // Verifica se o dia é da semana atual ou anterior
  function semanaLabel(data: string): 'Esta semana' | 'Semana passada' | 'Anterior' {
    const [d, m, y] = data.split('/').map(Number);
    const dataMs    = new Date(y, m - 1, d).getTime();
    const hoje      = new Date(2026, 4, 12).getTime(); // 12/05/2026
    const diff      = Math.floor((hoje - dataMs) / 86400000);
    if (diff <= 6)  return 'Esta semana';
    if (diff <= 13) return 'Semana passada';
    return 'Anterior';
  }

  // Agrupa os grupos por semana para inserir separadores
  let semanaAtual = '';

  return (
    <MobileShell>
      <AppHeader title="Trechos Monitorados" subtitle={`SP-280 · ${trechos.length} trechos`} />

      <div className="px-4 pt-4 pb-5 flex flex-col gap-3 fade-up">

        {/* Busca */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por código ou município..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(136,135,243)] shadow-sm"
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {([
            { key: 'todos',   label: `Todos (${counts.todos})`,     active: 'bg-gray-800 text-white',    inactive: 'bg-white text-gray-600 border border-gray-200' },
            { key: 'critico', label: `Crítico (${counts.critico})`, active: 'bg-red-500 text-white',     inactive: 'bg-red-50 text-red-600 border border-red-200' },
            { key: 'atencao', label: `Atenção (${counts.atencao})`, active: 'bg-yellow-400 text-white',  inactive: 'bg-yellow-50 text-yellow-700 border border-yellow-200' },
            { key: 'ok',      label: `OK (${counts.ok})`,           active: 'bg-green-600 text-white',   inactive: 'bg-green-50 text-green-700 border border-green-200' },
          ] as const).map(({ key, label, active, inactive }) => (
            <button
              key={key}
              onClick={() => setFiltro(key as Filtro)}
              className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 ${filtro === key ? active : inactive}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Lista agrupada por dia */}
        {grupos.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-10">Nenhum trecho encontrado.</p>
        ) : (
          grupos.map(grupo => {
            const semLabel = semanaLabel(grupo.data);
            const mostrarSeparador = semLabel !== semanaAtual;
            if (mostrarSeparador) semanaAtual = semLabel;

            return (
              <div key={grupo.data}>
                {/* Separador de semana */}
                {mostrarSeparador && (
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                      {semLabel}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}

                {/* Cabeçalho do dia */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border mb-2 ${badgeDia(grupo)}`}>
                  <Calendar size={13} />
                  <span className="text-xs font-bold flex-1">{grupo.label}</span>
                  <span className="text-[10px] font-semibold bg-white/60 rounded-full px-2 py-0.5">
                    {grupo.trechos.length} trecho{grupo.trechos.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Cards do dia */}
                <div className="flex flex-col gap-2 pl-1 border-l-2 border-gray-200 ml-1">
                  {grupo.trechos.map(t => <TrechoCard key={t.id} t={t} />)}
                </div>
              </div>
            );
          })
        )}

        {/* Legenda da barra de altura */}
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex gap-4 justify-center mt-1 shadow-sm">
          {[
            { cor: 'bg-red-400',    label: '> 30 cm — Crítico' },
            { cor: 'bg-yellow-400', label: '10–30 cm — Atenção' },
            { cor: 'bg-green-400',  label: '< 10 cm — OK' },
          ].map(({ cor, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <span className={`w-2 h-2 rounded-full ${cor} shrink-0`} />
              {label}
            </div>
          ))}
        </div>

      </div>
    </MobileShell>
  );
}
