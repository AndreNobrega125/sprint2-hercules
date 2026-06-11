import MobileShell from '@/components/MobileShell';
import AppHeader from '@/components/AppHeader';
import StatusBadge from '@/components/StatusBadge';
import { trechos, vistorias } from '@/lib/mock-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, User, Calendar, Ruler, ClipboardCheck } from 'lucide-react';

export function generateStaticParams() {
  return trechos.map(t => ({ id: t.id }));
}

export default async function TrechoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trecho = trechos.find(t => t.id === id);
  if (!trecho) notFound();

  const historico = vistorias
    .filter(v => v.trecho_id === id)
    .sort((a, b) => {
      // Ordena por data mais recente; empate → maior altura primeiro
      const [da, ma, ya] = a.data.split('/').map(Number);
      const [db, mb, yb] = b.data.split('/').map(Number);
      const dateA = new Date(ya, ma - 1, da).getTime();
      const dateB = new Date(yb, mb - 1, db).getTime();
      return dateB - dateA || b.altura_cm - a.altura_cm;
    });

  const barWidth = Math.min((trecho.altura_cm / 50) * 100, 100);
  const barColor = trecho.status === 'critico' ? 'bg-red-500' : trecho.status === 'atencao' ? 'bg-yellow-400' : 'bg-green-500';

  return (
    <MobileShell>
      <AppHeader title={trecho.codigo} back="/trechos" subtitle={`${trecho.municipio} · KM ${trecho.km_inicio}–${trecho.km_fim}`} />

      <div className="px-4 py-5 flex flex-col gap-4">
        {/* Status card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Status Atual</span>
            <StatusBadge status={trecho.status} />
          </div>

          <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
            <span>Altura estimada</span>
            <span className="font-bold text-base text-gray-800">{trecho.altura_cm} cm</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-1">
            <div className={`${barColor} h-3 rounded-full transition-all`} style={{ width: `${barWidth}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0 cm</span>
            <span className="text-green-600">10 cm</span>
            <span className="text-yellow-500">30 cm</span>
            <span className="text-red-500">50 cm</span>
          </div>
        </div>

        {/* Detalhes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Detalhes do Trecho</p>
          {[
            { icon: MapPin, label: 'Rodovia', value: trecho.rodovia },
            { icon: MapPin, label: 'Município', value: trecho.municipio },
            { icon: Ruler, label: 'Extensão', value: `KM ${trecho.km_inicio} ao KM ${trecho.km_fim}` },
            { icon: User, label: 'Fiscal Responsável', value: trecho.responsavel },
            { icon: Calendar, label: 'Última Vistoria', value: trecho.ultima_vistoria },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={16} className="text-green-600 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Histórico */}
        {historico.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Histórico de Vistorias</p>
            {historico.map(v => (
              <div key={v.id} className="border-l-2 border-green-300 pl-3 mb-3 last:mb-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">{v.data}</span>
                  <StatusBadge status={v.status} />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{v.observacoes}</p>
                <p className="text-xs text-green-700 font-medium mt-0.5">→ {v.recomendacao}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/vistoria?trecho=${trecho.id}`}
          className="text-white rounded-2xl px-5 py-4 flex items-center justify-center gap-2 font-bold text-sm shadow-md"
          style={{ background: 'linear-gradient(to right, rgb(100,99,220), rgb(136,135,243))' }}
        >
          <ClipboardCheck size={18} />
          Registrar Nova Vistoria
        </Link>
      </div>
    </MobileShell>
  );
}
