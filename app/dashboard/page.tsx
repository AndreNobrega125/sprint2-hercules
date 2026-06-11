'use client';
import MobileShell from '@/components/MobileShell';
import Link from 'next/link';
import { trechos, resumo } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import StatusDonut from '@/components/StatusDonut';
import { AlertTriangle, ChevronRight, ClipboardCheck, TrendingUp, Thermometer, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const trechosPorAltura = [...trechos].sort((a, b) => b.altura_cm - a.altura_cm);

const alturaMedia = Math.round(
  trechos.reduce((acc, t) => acc + t.altura_cm, 0) / trechos.length
);

// Donut — status da vegetação: mantém cores de status
const donutSlices = [
  { value: resumo.criticos, color: '#ef4444', label: 'Crítico' },
  { value: resumo.atencao,  color: '#eab308', label: 'Atenção' },
  { value: resumo.ok,       color: '#22c55e', label: 'OK'      },
];

export default function DashboardPage() {
  const router = useRouter();
  const criticos = trechosPorAltura.filter(t => t.status === 'critico');

  return (
    <MobileShell>
      {/* ── Header ── */}
      <header
        className="px-5 pt-12 pb-8"
        style={{ background: 'rgb(101,82,245)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <Image src="/logomotiva.png" alt="Motiva" width={32} height={32} priority className="rounded-lg" />
          <span className="text-sm font-bold tracking-widest text-white">VeroAI</span>
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Bom dia, <span className="font-bold text-white">João Silva</span> 👋
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
          SP-280 · Regional Oeste · 12/05/2026
        </p>
      </header>

      <div className="px-4 py-5 flex flex-col gap-5 fade-up">

        {/* ── Distribuição de status (Donut) — cores de status mantidas ── */}
        <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Distribuição de Status
          </p>
          <div className="flex items-center gap-5">
            <StatusDonut
              slices={donutSlices}
              total={resumo.total}
              centerLabel={String(resumo.total)}
              centerSub="trechos"
            />
            <div className="flex flex-col gap-2.5 flex-1">
              {[
                { cor: 'bg-red-500',    label: 'Crítico', val: resumo.criticos },
                { cor: 'bg-yellow-400', label: 'Atenção', val: resumo.atencao  },
                { cor: 'bg-green-500',  label: 'OK',      val: resumo.ok       },
              ].map(({ cor, label, val }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${cor} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold text-gray-800">{val}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`${cor} h-1.5 rounded-full`} style={{ width: `${(val / resumo.total) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KPIs ── */}
        <section className="grid grid-cols-3 gap-3">
          {[
            { icon: TrendingUp,   label: 'Vistorias/mês', value: resumo.vistorias_mes, sub: '+3 vs. mês ant.', bg: '#ede9fe', color: 'rgb(136,135,243)' },
            { icon: Thermometer,  label: 'Altura média',  value: `${alturaMedia} cm`,  sub: 'todos os trechos', bg: '#fef9c3', color: '#ca8a04' },
            { icon: AlertTriangle,label: 'Urgentes',      value: resumo.criticos,      sub: 'aguardam roçada',  bg: '#fee2e2', color: '#dc2626' },
          ].map(({ icon: Icon, label, value, sub, bg, color }) => (
            <div key={label} className="rounded-2xl p-3 flex flex-col gap-1" style={{ background: bg }}>
              <Icon size={16} style={{ color }} />
              <span className="text-xl font-extrabold leading-none" style={{ color }}>{value}</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight">{label}</span>
              <span className="text-[10px] text-gray-400 leading-tight">{sub}</span>
            </div>
          ))}
        </section>

        {/* ── Gráfico de barras — cores de status mantidas ── */}
        <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Altura por Trecho (cm) — maior para menor
          </p>
          <div className="flex items-end gap-1 h-28">
            {trechosPorAltura.map(t => {
              const pct = Math.min((t.altura_cm / 50) * 100, 100);
              const barColor =
                t.status === 'critico' ? 'bg-red-400' :
                t.status === 'atencao' ? 'bg-yellow-400' : 'bg-green-400';
              return (
                <div key={t.id} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className="text-[8px] text-gray-500 font-semibold">{t.altura_cm}</span>
                  <div className="w-full flex items-end justify-center" style={{ height: '72px' }}>
                    <div className={`w-full rounded-t-md ${barColor}`} style={{ height: `${pct}%`, minHeight: 4 }} />
                  </div>
                  <span className="text-[7px] text-gray-400">{t.km_inicio}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-gray-200">
            <div className="w-4 h-0.5 bg-red-400 rounded" />
            <span className="text-[10px] text-red-400 font-medium">Limite regulatório: 30 cm</span>
          </div>
        </section>

        {/* ── Trechos críticos ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Prioridade Máxima</p>
            <Link href="/trechos" className="text-xs font-semibold" style={{ color: 'rgb(136,135,243)' }}>Ver todos →</Link>
          </div>
          <div className="flex flex-col gap-2">
            {criticos.map(t => (
              <Link
                key={t.id}
                href={`/trechos/${t.id}`}
                className="bg-white border border-red-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-gray-800 truncate">{t.codigo}</span>
                    <StatusBadge status={t.status} />
                  </div>
                  <p className="text-xs text-gray-400">{t.municipio} · <span className="font-semibold text-red-500">{t.altura_cm} cm</span></p>
                  <div className="w-full bg-gray-100 rounded-full h-1 mt-1.5">
                    <div className="bg-red-400 h-1 rounded-full" style={{ width: `${Math.min((t.altura_cm / 50) * 100, 100)}%` }} />
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Conformidade — cores de status mantidas ── */}
        <section className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Índice de Conformidade</p>
            <span className="text-lg font-extrabold" style={{ color: 'rgb(136,135,243)' }}>
              {Math.round((resumo.ok / resumo.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 flex overflow-hidden">
            <div className="bg-green-500 h-3" style={{ width: `${(resumo.ok / resumo.total) * 100}%` }} />
            <div className="bg-yellow-400 h-3" style={{ width: `${(resumo.atencao / resumo.total) * 100}%` }} />
            <div className="bg-red-500 h-3" style={{ width: `${(resumo.criticos / resumo.total) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {resumo.ok} de {resumo.total} trechos dentro do padrão regulatório
          </p>
        </section>

        {/* ── CTA ── */}
        <Link
          href="/vistoria"
          className="text-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg"
          style={{ background: 'linear-gradient(to right, rgb(136,135,243), rgb(68,185,252))' }}
        >
          <div>
            <p className="font-bold text-base">Nova Vistoria</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>Registrar inspeção de trecho agora</p>
          </div>
          <div className="bg-white/20 rounded-xl p-2">
            <ClipboardCheck size={24} className="text-white" />
          </div>
        </Link>

      </div>
    </MobileShell>
  );
}
