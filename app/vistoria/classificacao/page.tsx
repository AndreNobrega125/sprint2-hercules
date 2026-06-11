'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import { trechos } from '@/lib/mock-data';
import { Minus, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { StatusVegetacao } from '@/lib/types';

function classificar(h: number): StatusVegetacao {
  if (h > 30) return 'critico';
  if (h > 10) return 'atencao';
  return 'ok';
}

const statusConfig = {
  ok: {
    label: 'OK',
    desc: 'Vegetação dentro do padrão. Nenhuma ação imediata.',
    icon: CheckCircle,
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    iconColor: 'text-green-500',
    gauge: '#22c55e',
  },
  atencao: {
    label: 'Atenção',
    desc: 'Vegetação em crescimento. Agendar roçada preventiva.',
    icon: Clock,
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    iconColor: 'text-yellow-500',
    gauge: '#eab308',
  },
  critico: {
    label: 'Crítico — Ação Imediata',
    desc: 'Vegetação acima de 30 cm. Risco regulatório.',
    icon: AlertTriangle,
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    iconColor: 'text-red-500',
    gauge: '#ef4444',
  },
};

/* ── Gauge SVG ── */
function Gauge({ valor, max = 60 }: { valor: number; max?: number }) {
  const r = 52;
  const cx = 70;
  const cy = 70;
  // Arco de 210° (de -210° a 30°), começando na esquerda-baixo
  const arcLength = 2 * Math.PI * r * (210 / 360);
  const pct = Math.min(valor / max, 1);
  const filled = pct * arcLength;

  // Calcular path do arco semi-circular
  const startAngle = (180 + 30) * (Math.PI / 180); // 210°
  const endAngle = (360 + 30) * (Math.PI / 180);   // 390° = 30°

  function polarToCartesian(angle: number) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const trackPath = `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`;

  // Cor do arco preenchido
  const color =
    valor > 30 ? '#ef4444' :
    valor > 10 ? '#eab308' : '#22c55e';

  return (
    <svg width="140" height="110" viewBox="0 0 140 110">
      {/* Trilha */}
      <path d={trackPath} fill="none" stroke="#e5e7eb" strokeWidth={10} strokeLinecap="round" />
      {/* Arco preenchido */}
      <path
        d={trackPath}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${arcLength}`}
        style={{ transition: 'stroke-dasharray 0.5s ease, stroke 0.3s ease' }}
      />
      {/* Marcas regulatórias */}
      {/* Texto central */}
      <text x="70" y="72" textAnchor="middle" fontSize="22" fontWeight="800" fill={color}>{valor}</text>
      <text x="70" y="86" textAnchor="middle" fontSize="10" fill="#9ca3af">cm</text>
    </svg>
  );
}

function ClassificacaoContent() {
  const router = useRouter();
  const params = useSearchParams();
  const trecho = params.get('trecho') ?? '';
  const fiscal = params.get('fiscal') ?? '';
  const obs = params.get('obs') ?? '';

  const trechoObj = trechos.find(t => t.id === trecho);
  const [altura, setAltura] = useState(20);
  const status = classificar(altura);
  const cfg = statusConfig[status];
  const StatusIcon = cfg.icon;

  function avancar() {
    router.push(`/recomendacoes?trecho=${trecho}&fiscal=${encodeURIComponent(fiscal)}&altura=${altura}&status=${status}&obs=${encodeURIComponent(obs)}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <AppHeader title="Classificar Vegetação" back={`/vistoria/foto?trecho=${trecho}`} subtitle="Passo 3 de 4 — Altura e classificação" />
      <div className="px-4 py-5 flex flex-col gap-4 fade-up">

        {/* Progresso */}
        <div className="flex gap-1">
          {[1,2,3,4].map(n => (
            <div key={n} className={`flex-1 h-1.5 rounded-full ${n <= 3 ? 'bg-green-600' : 'bg-gray-200'}`} />
          ))}
        </div>

        {trechoObj && (
          <p className="text-xs text-gray-500 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            Trecho: <span className="font-semibold text-gray-700">{trechoObj.codigo}</span> — {trechoObj.municipio}
          </p>
        )}

        {/* Gauge + controles */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 mb-2 text-center">Altura estimada da vegetação</p>

          {/* Gauge central */}
          <div className="flex justify-center mb-2">
            <Gauge valor={altura} />
          </div>

          {/* Botões +/- */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              onClick={() => setAltura(h => Math.max(0, h - 1))}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 active:bg-gray-100"
            >
              <Minus size={20} />
            </button>
            <div className="flex gap-2">
              {[5, 10, 20, 35, 45].map(v => (
                <button
                  key={v}
                  onClick={() => setAltura(v)}
                  className={`text-xs px-2 py-1 rounded-lg border transition-all ${altura === v ? 'bg-green-700 text-white border-green-700' : 'text-gray-500 border-gray-200'}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <button
              onClick={() => setAltura(h => Math.min(100, h + 1))}
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: 'rgb(136,135,243)', color: 'rgb(136,135,243)' }}
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={60}
            value={altura}
            onChange={e => setAltura(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 px-0.5">
            <span>0</span>
            <span className="text-green-600 font-medium">10 OK</span>
            <span className="text-yellow-500 font-medium">30 Atenção</span>
            <span className="text-red-500 font-medium">60 cm</span>
          </div>
        </div>

        {/* Classificação automática */}
        <div className={`${cfg.bg} border ${cfg.border} rounded-2xl p-4 flex gap-3 items-start shadow-sm`}>
          <StatusIcon size={22} className={`${cfg.iconColor} shrink-0 mt-0.5`} />
          <div className="flex-1">
            <p className={`text-sm font-bold ${cfg.text}`}>Classificação: {cfg.label}</p>
            <p className={`text-xs ${cfg.text} mt-0.5`}>{cfg.desc}</p>
          </div>
        </div>

        {/* Referência visual das faixas */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Faixas Regulatórias</p>
          {[
            { range: '0–10 cm', label: 'OK', bar: 'bg-green-500', w: '17%', text: 'text-green-700' },
            { range: '10–30 cm', label: 'Atenção', bar: 'bg-yellow-400', w: '33%', text: 'text-yellow-700' },
            { range: '>30 cm', label: 'Crítico', bar: 'bg-red-500', w: '50%', text: 'text-red-700' },
          ].map(({ range, label, bar, w, text }) => (
            <div key={label} className="flex items-center gap-3 mb-2 last:mb-0">
              <div className="w-24 shrink-0">
                <div className={`${bar} h-2 rounded-full`} style={{ width: w }} />
              </div>
              <span className="text-xs text-gray-500">{range}</span>
              <span className={`text-xs font-semibold ml-auto ${text}`}>{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={avancar}
          className="text-white rounded-2xl py-4 font-bold text-sm shadow-md"
        style={{ background: 'linear-gradient(to right, rgb(100,99,220), rgb(136,135,243))' }}
        >
          Avançar — Ver Recomendação
        </button>
      </div>
    </div>
  );
}

export default function ClassificacaoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Carregando...</div>}>
      <ClassificacaoContent />
    </Suspense>
  );
}
