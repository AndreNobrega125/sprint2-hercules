# VeroAI Sprint 2 — Quick Start Guide

## 🚀 Começar em 3 Passos

### 1️⃣ Instalar Dependências (1 min)
```bash
cd "d:\Editores código\Vscode\Sprint1 Hercules\veroai-mobile"
npm install --legacy-peer-deps
```

### 2️⃣ Iniciar o App (2 min)
```bash
npm start
```

Você verá um QR code no terminal. Escanear com:
- **Expo Go** app (iOS/Android)
- **Android Emulator** (se tiver instalado)
- **Web browser** (press `w` no terminal)

### 3️⃣ Fazer Login
Use uma das contas de teste:

| Matrícula | Perfil | Nome |
|-----------|--------|------|
| 100001 | Gestor | Carlos Silva |
| 200001 | Fiscal | João Fiscal |
| 300001 | Trabalhador | Pedro Trabalhador |

**Senha**: qualquer valor (não validada)

---

## 🎮 Testando os Fluxos

### Fluxo 1: Dashboard + Trechos
```
Login → Dashboard → Tap "Ver Todos os Trechos" → Tap um trecho → Ver detalhes
```

### Fluxo 2: Notificações
```
Login → Tap aba "Notificações" → Tap notificação → Marcar como lida
```

### Fluxo 3: Nova Vistoria (Fiscal)
```
Login com 200001 → Dashboard → "Nova Vistoria" → Step 1: Selecionar trecho 
→ Step 2: Capturar foto → Step 3: Informar altura (ex: 25cm) → Registrar
```

---

## 📁 Estrutura do Projeto

```
veroai-mobile/
├── src/
│   ├── types/              # Tipos TypeScript
│   ├── screens/            # 5 telas principais
│   ├── context/            # Zustand stores
│   ├── mocks/              # Dados mockados
│   └── navigation/         # Navegação
├── App.tsx                 # Entrada
├── README.md               # Documentação completa
├── SPRINT2_SUMMARY.md      # Sumário técnico
├── VIDEO_SCRIPT.md         # Roteiro vídeo
└── package.json            # Dependências
```

---

## 🎯 O Que Existe

✅ **5 Telas**
- LoginScreen
- DashboardGestor, DashboardFiscal, DashboardTrabalhador
- ListaTrechos, TrechoDetalhe
- NovaVistoria, NotificacoesScreen

✅ **3 Stores Zustand**
- authStore (login, user)
- dataStore (trechos, vistorias, intervenções)
- notificationStore (notificações)

✅ **Mock Data**
- 5 trechos SP-280
- 3 vistorias
- 4 intervenções
- 3 notificações

✅ **Navegação**
- Stack Navigator (Login)
- Bottom Tabs (Dashboard, Trechos, Notificações)
- Dinâmica por role (3 versões diferentes)

---

## 🐛 Troubleshooting

### Erro: Module not found
```bash
npm install --legacy-peer-deps
```

### Erro: TypeScript
```bash
npx tsc --noEmit
```

### App muito lento
Use Android Emulator ao invés de Expo Go para melhor performance.

### Não vejo o QR code
```bash
npm start
# Pressionar 'a' para Android
# Pressionar 'i' para iOS
# Pressionar 'w' para Web
```

---

## 📱 Contas de Teste Detalhadas

### 100001 - Gestor (Carlos Silva)
- Dashboard: KPIs, conformidade, intervenções
- Cores: Azul (#1976d2)
- Acesso: Todas as telas + relatórios (futura)

### 200001 - Fiscal (João Fiscal)
- Dashboard: Trechos críticos, ação rápida "Nova Vistoria"
- Cores: Azul claro (#2196f3)
- Acesso: Todas as telas + registro de vistorias

### 300001 - Trabalhador (Pedro Trabalhador)
- Dashboard: Tarefas do dia, trechos para roçada
- Cores: Verde (#2e7d32)
- Acesso: Tarefas + lista de trechos

---

## 📊 Dados Mockados - Referência Rápida

**Trechos** (5 totais):
- KM50: 35cm CRÍTICO
- KM55: 22cm ATENÇÃO
- KM60: 8cm OK
- KM65: 38cm CRÍTICO
- KM70: 28cm ATENÇÃO

**Classificação**:
- < 10cm: OK (verde)
- 10-30cm: ATENÇÃO (laranja)
- > 30cm: CRÍTICO (vermelho)

---

## 🎬 Gravando Vídeo

Ver `VIDEO_SCRIPT.md` para roteiro completo (3 min).

**Setup rápido:**
1. Abrir app no emulador
2. Iniciar gravação (Windows: Xbox Game Bar)
3. Seguir roteiro
4. Exportar MP4
5. Upload YouTube (não listado)

---

## 🔐 Debug Mode

Para ver estado do Zustand no console:
```typescript
// No App.tsx ou qualquer componente
useAuthStore.subscribe(state => console.log(state))
useDataStore.subscribe(state => console.log(state))
useNotificationStore.subscribe(state => console.log(state))
```

---

## 📦 Comandos Úteis

```bash
# Iniciar (padrão - Expo CLI)
npm start

# Android
npm run android

# iOS (Mac apenas)
npm run ios

# Web
npm run web

# Verificar tipos TypeScript
npx tsc --noEmit

# Limpar cache
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🎯 Checklist Antes de Submeter

- [ ] App roda sem erros com `npm start`
- [ ] Login funciona com as 3 contas (100001, 200001, 300001)
- [ ] Dashboard muda de acordo com perfil
- [ ] Botão "Ver Trechos" funciona
- [ ] Clicar em trecho → vê detalhes
- [ ] Notificações mostram badge e permitem marcar como lida
- [ ] Nova Vistoria tem 3 passos e classifica automaticamente
- [ ] Vídeo foi gravado (2:30-3:00 min)
- [ ] Arquivo .txt está pronto com integrantes e links
- [ ] GitHub atualizado com push final

---

## 📚 Documentação

- **README.md** - Guia completo com todos os detalhes
- **SPRINT2_SUMMARY.md** - Sumário técnico e decisões
- **VIDEO_SCRIPT.md** - Roteiro detalhado para vídeo
- **PROXIMOS_PASSOS.md** - O que falta para entrega final

---

## 🆘 Precisa de Ajuda?

1. Ver `README.md` para funcionalidades completas
2. Ver `SPRINT2_SUMMARY.md` para decisões técnicas
3. Ver `VIDEO_SCRIPT.md` para roteiro
4. Ver `PROXIMOS_PASSOS.md` para próximos passos

---

## ✨ Destaques Técnicos

- ✅ React Native 0.85.3 + Expo 56.0.9
- ✅ React Navigation 6.x (Stack + Tabs)
- ✅ Zustand para estado global
- ✅ TypeScript com tipagem explícita
- ✅ Código modular e escalável

---

**Versão**: 2.0.0 Sprint 2  
**Status**: ✅ Código pronto, 🟡 Vídeo/entrega em progresso  
**Tempo para testar**: 5-10 minutos  
**Tempo para gravar**: 30-45 minutos  

**Boa sorte! 🚀**
