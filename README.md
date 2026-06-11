# VeroAI — Monitoramento Inteligente de Vegetação em Rodovias

> **Challenge CCR Motiva · Sprint 2 — App Mobile Nativo (React Native/Expo)**

## 🚀 Como Rodar

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

Pressione `a` para abrir no **emulador Android** ou escaneie o QR code com **Expo Go**.

---

## 🔐 Contas de Teste

| Matrícula | Perfil | Funções |
|-----------|--------|---------|
| **G101** | Gestor | Vê tudo, notificações de vistorias e roçadas |
| **F101** | Fiscal | Registra vistorias, vê trechos críticos |
| **T101** | Trabalhador | Marca roçadas como concluídas (só com vistoria) |

---

## 📱 Funcionalidades Principais

### **Gestor (G101)**
- 📊 Dashboard com status dos trechos (OK, Atenção, Crítico)
- 📋 Histórico de vistorias recentes
- ✓ Roçadas pendentes e concluídas
- 🔔 Notificações de vistorias e roçadas (clicável)

### **Fiscal (F101)**
- 🗺️ Trechos críticos e em atenção
- 📝 Registra vistorias (altura, foto, observações)
- 🔔 Notificações quando trabalhador conclui roçada

### **Trabalhador (T101)**
- ✓ Marca roçadas como concluídas (validação: requer vistoria prévia)
- 🔒 Sem acesso a vistorias
- 🔔 Vê notificações de pendências

---

## 📊 Fluxo de Negócio

1. **Fiscal** registra vistoria no trecho
   - Classifica altura: OK (<10cm), Atenção (10-30cm), Crítico (>30cm)
   - Gera roçada automática se Crítico
   - Gestor recebe notificação

2. **Trabalhador** marca roçada como concluída
   - Só consegue se houver vistoria registrada
   - Fiscal + Gestor recebem notificação

3. **Gestor** monitora tudo
   - Vê histórico completo de vistorias
   - Acompanha roçadas pendentes e concluídas
   - Clica em notificações para ver detalhes

---

## 📁 Estrutura

```
mobile/
├── src/
│   ├── screens/         ← Telas principais
│   ├── navigation/      ← Navegação (Stack + Tabs)
│   ├── context/         ← Estado (Zustand)
│   ├── mocks/           ← Dados mock realistas
│   ├── types/           ← TypeScript types
│   └── components/      ← Componentes reutilizáveis
├── App.tsx
├── index.js
├── app.json
└── package.json
```

---

## 🎯 Dados Mock

**Trechos:** 5 trechos da SP-280 (km 50-70)
- Status: OK, Atenção, Crítico
- Altura da vegetação: 8cm até 38cm
- Coordenadas GPS mockadas

**Vistorias:** 3 vistorias registradas (fiscal)
**Intervenções:** 4 roçadas (pendentes e concluídas)
**Notificações:** Dinâmicas conforme ações

---

## 🛠️ Tecnologias

- **React Native 0.85** + **Expo 56**
- **React Navigation** (Stack + Bottom Tabs)
- **Zustand** (gerenciamento de estado)
- **TypeScript**
- **StyleSheet** (nativo)

---

## 📝 Requisitos do Professor (Sprint 2)

✅ App mobile funcional em React Native/Expo
✅ 3+ telas com navegação implementada
✅ Mock de dados realista (contexto Motiva)
✅ Fluxo completo funcional (vistoria → roçada → notificação)
✅ Organização de código clara
✅ Consistência visual com protótipo Sprint 1

---

**Desenvolvido para:** Challenge CCR Motiva — FIAP 2026
