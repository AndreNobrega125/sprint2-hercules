import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeroAI — Monitoramento de Vegetação",
  description: "Aplicativo mobile para monitoramento inteligente de vegetação em rodovias. Motiva / CCR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  );
}
