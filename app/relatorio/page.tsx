'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MobileShell from '@/components/MobileShell';
import AppHeader from '@/components/AppHeader';
import StatusBadge from '@/components/StatusBadge';
import { trechos, resumo } from '@/lib/mock-data';
import { CheckCircle2, AlertTriangle, Clock, TrendingUp, Download, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';

const chartData = [...trechos]
  .sort((a, b) => b.altura_cm - a.altura_cm)
  .map(t => ({
    name: `KM ${t.km_inicio}`,
    altura: t.altura_cm,
    status: t.status,
  }));

// Tendência por semana — semanas reais do dataset
const tendencia = [
  { mes: '28/04',  criticos: 2, atencao: 3, ok: 3 },
  { mes: '05/05',  criticos: 3, atencao: 4, ok: 3 },
  { mes: '12/05',  criticos: 4, atencao: 4, ok: 4 },
];

function barFill(status: string) {
  if (status === 'critico') return '#f87171';
  if (status === 'atencao') return '#facc15';
  return '#4ade80';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        <p className="text-gray-600">{payload[0].value} cm</p>
      </div>
    );
  }
  return null;
};

function RelatorioContent() {
  const params = useSearchParams();
  const novo = params.get('novo') === '1';

  const byAltura = (a: typeof trechos[0], b: typeof trechos[0]) => b.altura_cm - a.altura_cm;
  const criticos = trechos.filter(t => t.status === 'critico').sort(byAltura);
  const atencao  = trechos.filter(t => t.status === 'atencao').sort(byAltura);
  const ok       = trechos.filter(t => t.status === 'ok').sort(byAltura);

  return (
    <MobileShell>
      <AppHeader title="Relatório" subtitle="SP-280 · Maio 2026" />
      <div className="px-4 py-5 flex flex-col gap-4 fade-up">

        {/* Banner de sucesso */}
        {novo && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 size={22} className="text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-700">Vistoria registrada!</p>
              <p className="text-xs text-green-600">Dados salvos e relatório atualizado.</p>
            </div>
          </div>
        )}

        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3">
          {[
            { icon: TrendingUp, label: 'Total de Trechos', value: resumo.total, color: 'text-gray-700', bg: 'bg-white' },
            { icon: Activity, label: 'Vistorias no Mês', value: resumo.vistorias_mes, color: 'text-green-600', bg: 'bg-green-50' },
            { icon: AlertTriangle, label: 'Trechos Críticos', value: resumo.criticos, color: 'text-red-600', bg: 'bg-red-50' },
            { icon: Clock, label: 'Em Atenção', value: resumo.atencao, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className={`${bg} border border-gray-100 rounded-2xl p-4 shadow-sm`}>
              <Icon size={16} className={`${color} mb-2`} />
              <p className={`text-3xl font-extrabold ${color} leading-none`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </section>

        {/* Gráfico de barras: altura por trecho */}
        <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Altura da Vegetação por Trecho
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 50]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: '30cm', position: 'right', fontSize: 9, fill: '#ef4444' }} />
              <Bar dataKey="altura" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={barFill(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-400 inline-block" />Crítico (&gt;30cm)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-yellow-400 inline-block" />Atenção</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-400 inline-block" />OK</span>
          </div>
        </section>

        {/* Gráfico de tendência mensal */}
        <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Tendência Mensal — Trechos Críticos
          </p>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={tendencia} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="criticos" fill="#f87171" radius={[4, 4, 0, 0]} name="Críticos" />
              <Bar dataKey="atencao" fill="#fbbf24" radius={[4, 4, 0, 0]} name="Atenção" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-1">Semana de 12/05 apresenta maior volume de registros do período.</p>
        </section>

        {/* Conformidade */}
        <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Conformidade Regulatória</p>
            <span className="text-xl font-extrabold text-green-700">
              {Math.round((resumo.ok / resumo.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 flex overflow-hidden mb-2">
            <div className="bg-green-500 h-3 transition-all" style={{ width: `${(resumo.ok / resumo.total) * 100}%` }} />
            <div className="bg-yellow-400 h-3 transition-all" style={{ width: `${(resumo.atencao / resumo.total) * 100}%` }} />
            <div className="bg-red-500 h-3 transition-all" style={{ width: `${(resumo.criticos / resumo.total) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400">{resumo.ok} de {resumo.total} trechos dentro do padrão.</p>
        </section>

        {/* Listagem por status */}
        {[
          { label: 'Críticos', lista: criticos, headerColor: 'text-red-600', iconEl: <AlertTriangle size={14} className="text-red-500" /> },
          { label: 'Em Atenção', lista: atencao, headerColor: 'text-yellow-600', iconEl: <Clock size={14} className="text-yellow-500" /> },
          { label: 'Conformes', lista: ok, headerColor: 'text-green-600', iconEl: <CheckCircle2 size={14} className="text-green-500" /> },
        ].map(({ label, lista, headerColor, iconEl }) => lista.length > 0 && (
          <section key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 ${headerColor}`}>
              {iconEl}{label}
            </div>
            {lista.map((t, i) => (
              <div key={t.id} className={`flex items-center justify-between py-2 ${i < lista.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.codigo}</p>
                  <p className="text-xs text-gray-400">{t.municipio} · {t.altura_cm} cm</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </section>
        ))}

        {/* Exportar */}
        <button className="border-2 rounded-2xl py-3 font-semibold text-sm flex items-center justify-center gap-2" style={{ borderColor: 'rgb(136,135,243)', color: 'rgb(136,135,243)' }}>
          <Download size={16} />
          Exportar Relatório em PDF
        </button>
        <p className="text-center text-xs text-gray-400 -mt-2">Disponível na Sprint 2</p>

      </div>
    </MobileShell>
  );
}

export default function RelatorioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Carregando...</div>}>
      <RelatorioContent />
    </Suspense>
  );
}
