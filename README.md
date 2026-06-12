# VeroAI — Monitoramento Inteligente de Vegetação em Rodovias

> **Challenge CCR Motiva · Sprint 2 — App Mobile Nativo (React Native/Expo)**

## 🚀 Como Rodar

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

No terminal, pressione `a` para abrir no **emulador Android** (Android Studio aberto) ou escaneie o QR code com o app **Expo Go**.

> Dica: use `npm run dev-fast` (dentro de `mobile/`) para iniciar o Expo sem checagem de TypeScript, deixando o startup mais rápido.

---

## 🔐 Contas de Teste

| Matrícula | Perfil | Acesso |
|-----------|--------|--------|
| **G101** | Gestor | Visão geral de tudo: vistorias e roçadas de todos os trechos |
| **F101** | Fiscal | Registra vistorias e acompanha trechos a vistoriar |
| **T101** | Trabalhador | Marca roçadas como concluídas |

A senha não é validada na Sprint 2 — qualquer valor é aceito. Apenas as 3 matrículas acima são reconhecidas pelo sistema; qualquer outro valor é rejeitado no login.

---

## 📱 Telas e Funcionalidades

### Login
- Campo de matrícula com validação estrita (G101/F101/T101)
- Detecção automática do perfil (Gestor/Fiscal/Trabalhador)

### Dashboard do Gestor (G101)
- Indicadores gerais: total de trechos, OK, Atenção, Crítico, conformidade
- Histórico das últimas vistorias registradas pelo Fiscal
- Roçadas pendentes e concluídas pelo Trabalhador
- Notificações de vistorias e roçadas, clicáveis → leva direto ao trecho atualizado

### Dashboard do Fiscal (F101)
- Indicadores: trechos a vistoriar hoje, vistoriados hoje, total
- Lista de "Trechos que Preciso Vistoriar" e "Vistoriado Hoje"
- Botão "+ Nova Vistoria" (3 passos: selecionar trecho, altura, observações/foto)
- Notificações quando o Trabalhador conclui uma roçada

### Dashboard do Trabalhador (T101)
- Indicadores: roçadas pendentes, em andamento, concluídas hoje
- 🌿 "Pronto para Roçada" — trechos já vistoriados, com botão "Marcar Roçada como Concluída"
- ⏳ "Aguardando Vistoria do Fiscal" — trechos sem vistoria ainda (não pode concluir)
- **Sem acesso a registro de vistoria** (acesso negado se tentar navegar até lá)

### Lista de Trechos
- Os 5 trechos da SP-280 com status, altura atual e data da última vistoria
- Destaque visual para trechos pendentes de vistoria (via notificação)

### Detalhes do Trecho
- Informações completas (km, regional, status, altura atual)
- Histórico de vistorias e intervenções (roçadas)
- Botão "Registrar Nova Vistoria" (oculto para o Trabalhador)

### Notificações
- Lista filtrada por usuário logado
- Marcar como lida / marcar todas / excluir
- Cada notificação é clicável e leva para o trecho/tela correspondente com dados atualizados

---

## 📊 Fluxo de Negócio

1. **Fiscal** registra uma vistoria em um trecho
   - Classificação automática pela altura: **OK** (≤10cm), **Atenção** (10–30cm), **Crítico** (≥30cm)
   - **Gestor** e **Trabalhador** recebem notificação

2. **Trabalhador** marca a roçada como concluída
   - Só é possível se o trecho já tiver uma vistoria registrada (senão fica em "Aguardando Vistoria do Fiscal")
   - **Fiscal** e **Gestor** recebem notificação

3. **Gestor** acompanha tudo
   - Vê todas as vistorias feitas pelo Fiscal e roçadas concluídas pelo Trabalhador
   - Clica nas notificações para abrir o trecho com as informações mais recentes

---

## 📁 Estrutura

```
sprint2-hercules/
├── README.md                    ← este arquivo
└── mobile/                       ← App Expo (Sprint 2)
    ├── src/
    │   ├── screens/              ← Login, 3 Dashboards, ListaTrechos, TrechoDetalhe, NovaVistoria, Notificacoes
    │   ├── navigation/           ← Stack + Bottom Tabs (dinâmico por perfil)
    │   ├── context/              ← authStore, dataStore, notificationStore (Zustand)
    │   ├── mocks/                ← Dados mock (usuários, trechos, vistorias, intervenções, notificações)
    │   └── types/                ← Tipos TypeScript
    ├── App.tsx
    ├── app.json
    └── package.json
```

---

## 🎯 Dados Mock

- **Trechos:** 5 trechos da SP-280 (km 50 a km 70), com status OK/Atenção/Crítico
- **Vistorias:** registros com altura, data/hora e fiscal responsável
- **Intervenções (roçadas):** pendentes e concluídas, vinculadas aos trechos
- **Notificações:** geradas dinamicamente conforme as ações de cada perfil

---

## 🛠️ Tecnologias

- **React Native 0.85** + **Expo SDK 56**
- **React Navigation 6** (Native Stack + Bottom Tabs)
- **Zustand** (gerenciamento de estado global)
- **TypeScript**

---

## 📝 Requisitos do Professor (Sprint 2)

- ✅ App mobile nativo funcional (React Native/Expo)
- ✅ Múltiplas telas com navegação (Login, 3 Dashboards, Trechos, Detalhes, Nova Vistoria, Notificações)
- ✅ Mock de dados realista no contexto Motiva/SP-280
- ✅ Fluxo completo: vistoria → roçada → notificação, com regras por perfil (Gestor/Fiscal/Trabalhador)
- ✅ Organização de código (screens, navigation, context, mocks, types)
- ⏳ Vídeo demonstrativo (roteiro em `mobile/VIDEO_SCRIPT.md`)

---

**Desenvolvido para:** Challenge CCR Motiva — FIAP 2026
