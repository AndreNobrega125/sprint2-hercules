# VeroAI — Sprint 2: Aplicativo Mobile Funcional com React Native/Expo

> Monitoramento Inteligente de Vegetação em Rodovias

---

## 📋 Visão Geral

O **VeroAI** é um aplicativo mobile desenvolvido em **React Native com Expo** que implementa o fluxo de monitoramento de vegetação em rodovias da Motiva/CCR. Esta é a **Sprint 2**, onde o protótipo web da Sprint 1 foi convertido para um app nativo funcional com dados mockados.

### Principais Melhorias em Relação à Sprint 1

- ✅ **3 perfis de usuário com dashboards customizados**: Gestor, Fiscal e Trabalhador
- ✅ **Autenticação por matrícula** com role detection automático
- ✅ **Sistema de notificações** com contador de não lidas
- ✅ **Navegação em abas** (Tab Navigation) diferenciada por perfil
- ✅ **Dados mockados estruturados** simulando vistorias, intervenções e trechos reais
- ✅ **Stack de navegação com detalhes do trecho**
- ✅ **Suporte para recursos nativos** (câmera, GPS, notificações)

---

## 🎯 Objetivos Atingidos

| Critério | Status | Detalhes |
|----------|--------|----------|
| **App funcional com 3+ telas** | ✅ | 5 telas principais + navegação por abas |
| **Navegação implementada** | ✅ | Stack + Bottom Tabs, dinâmica por perfil |
| **Mock de dados estruturado** | ✅ | 5 trechos, 3 vistorias, 4 intervenções, notificações |
| **Fluxo completo funcional** | ✅ | Login → Dashboard → Trechos → Detalhes |
| **Alertas de altura transmitidos** | ✅ | Notificações por status crítico/atenção |
| **README atualizado** | ✅ | Instruções completas de instalação e execução |

---

## 🏗️ Arquitetura

```
veroai-mobile/
├── src/
│   ├── types/              # Definições de tipos TypeScript
│   │   └── index.ts        # User, Trecho, Vistoria, Intervencao, Notificacao
│   ├── screens/            # Componentes de telas
│   │   ├── LoginScreen.tsx           # Login com autenticação por matrícula
│   │   ├── DashboardGestor.tsx       # Dashboard para gestores
│   │   ├── DashboardFiscal.tsx       # Dashboard para fiscais
│   │   ├── DashboardTrabalhador.tsx  # Dashboard para equipes de trabalho
│   │   ├── ListaTrechos.tsx          # Lista de trechos com filtro e busca
│   │   ├── TrechoDetalhe.tsx         # Detalhes, histórico e intervenções
│   │   └── NotificacoesScreen.tsx    # Centro de notificações
│   ├── context/            # Zustand stores para estado global
│   │   ├── authStore.ts    # Gerenciamento de autenticação
│   │   ├── dataStore.ts    # Gerenciamento de dados de trechos/vistorias
│   │   └── notificationStore.ts # Gerenciamento de notificações
│   ├── mocks/              # Dados mockados
│   │   └── index.ts        # Trechos, vistorias, intervenções, notificações
│   ├── navigation/         # Navegação
│   │   └── index.tsx       # Stack + Tabs Navigator com roles
│   └── services/           # (Planejado para Sprint 3)
├── App.tsx                 # Ponto de entrada principal
├── app.json                # Configuração Expo
├── package.json            # Dependências
├── tsconfig.json           # TypeScript config
└── README.md               # Este arquivo
```

---

## 👥 Perfis de Usuário e Dashboards

### 1️⃣ **Gestor (Matrícula 1xxxxx)**

**Exemplo: 100001**

**Funcionalidades:**
- Visão consolidada de todos os trechos
- KPIs: Trechos OK / Atenção / Crítico / Taxa de Conformidade
- Controle de intervenções (Pendentes / Em Progresso / Concluídas)
- Alertas críticos destacados
- Centro de notificações com histórico
- Geração de relatórios (planejado)

**Cores tema:** Azul (#1976d2)

---

### 2️⃣ **Fiscal de Inspeção (Matrícula 2xxxxx)**

**Exemplo: 200001**

**Funcionalidades:**
- Dashboard com trechos atribuídos e status
- Listagem destacada de trechos críticos e em atenção
- Acesso rápido para registrar nova vistoria
- Histórico de vistorias por trecho
- Notificações de trechos que precisam inspeção

**Cores tema:** Azul claro (#2196f3)

---

### 3️⃣ **Trabalhador/Roçada (Matrícula 3xxxxx)**

**Exemplo: 300001**

**Funcionalidades:**
- Dashboard com tarefas diárias (Pendentes / Em Andamento / Concluídas)
- Listagem de trechos com altura crítica que precisam roçada
- Histórico de intervenções realizadas
- Notificações sobre novas tarefas atribuídas
- Marcar tarefas como concluídas

**Cores tema:** Verde (#2e7d32)

---

## 📊 Dados Mockados

### Trechos (5 trechos da SP-280)
```typescript
[
  SP280-KM50 | Osasco      | 35cm | CRÍTICO   ✓
  SP280-KM55 | Osasco      | 22cm | ATENÇÃO   ✓
  SP280-KM60 | Itapevi     | 8cm  | OK        ✓
  SP280-KM65 | Itapevi     | 38cm | CRÍTICO   ✓
  SP280-KM70 | Jandira     | 28cm | ATENÇÃO   ✓
]
```

### Classificação de Risco
| Altura | Classificação | Ação |
|--------|---------------|------|
| < 10 cm | OK | Monitoramento regular |
| 10-30 cm | ATENÇÃO | Roçada preventiva em 15 dias |
| > 30 cm | CRÍTICO | Roçada imediata — risco de autuação |

### Vistorias (3 registros com fotos e coordenadas)
```typescript
Vistoria #1 | SP280-KM50 | 09:30 | 35cm | Crítica
Vistoria #2 | SP280-KM55 | 10:15 | 22cm | Atenção
Vistoria #3 | SP280-KM60 | 08:00 | 8cm  | OK
```

### Intervenções (4 registros com status e prioridade)
```typescript
Intervencao #1 | SP280-KM50 | Roçada | ALTA    | Pendente
Intervencao #2 | SP280-KM55 | Roçada | MÉDIA   | Pendente
Intervencao #3 | SP280-KM60 | Roçada | BAIXA   | Concluída
Intervencao #4 | SP280-KM65 | Roçada | ALTA    | Pendente
```

### Notificações (3 alertas para gestor)
```typescript
Alerta Crítico:      SP280-KM50 com vegetação 35cm
Nova Intervenção:    Roçada concluída em SP280-KM60
Trechos Pendentes:   2 trechos aguardam inspeção
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** 18+
- **npm** 9+ ou **yarn**
- **Expo CLI** (instalado globalmente): `npm install -g expo-cli`
- **Android Emulator** ou **Expo Go** (app iOS/Android)

### Instalação

```bash
# 1. Navegar até a pasta do projeto
cd "d:\Editores código\Vscode\Sprint1 Hercules\veroai-mobile"

# 2. Instalar dependências
npm install --legacy-peer-deps

# 3. Iniciar o servidor Expo
npm start
```

### Executar em Diferentes Plataformas

```bash
# Android Emulator
npm run android

# iOS Simulator (Mac apenas)
npm run ios

# Web Browser
npm run web

# Expo Go App (scan QR code)
npm start
# Então escanear o QR code com o Expo Go instalado no celular
```

---

## 🔐 Contas de Teste

Use qualquer matrícula para login (a senha não é validada na Sprint 2).

| Perfil | Matrícula | Nome | Cor |
|--------|-----------|------|-----|
| Gestor | **100001** | Carlos Silva | 🔵 Azul |
| Fiscal | **200001** | João Fiscal | 🔷 Azul claro |
| Trabalhador | **300001** | Pedro Trabalhador | 🟢 Verde |

---

## 🎮 Fluxos Principais

### ✅ Fluxo 1: Login → Dashboard → Trechos

1. **Tela de Login**
   - Inserir matrícula (ex: 100001)
   - Clicar "Entrar"
   - Redirects para dashboard de acordo com role

2. **Dashboard Personalizado**
   - Gestor: KPIs, intervenções, alertas
   - Fiscal: Trechos críticos, ação rápida para vistoria
   - Trabalhador: Tarefas diárias, trechos para roçada

3. **Lista de Trechos**
   - Filtro por código ou município
   - Ordenação por criticidade ou nome
   - Tap em um trecho → Detalhes

4. **Detalhes do Trecho**
   - Informações gerais, KM, Regional
   - Histórico de vistorias (datas, alturas, observações)
   - Histórico de intervenções (tipo, status, prioridade)

### ✅ Fluxo 2: Notificações

1. **Aba de Notificações**
   - Badge com contador de não lidas
   - Tap para marcar como lida
   - Botão "Marcar todas como lidas"
   - Tap em delete para remover

2. **Tipos de Notificações**
   - 🔴 **Alerta**: Trechos com status crítico
   - 🟢 **Conclusão**: Intervenção concluída
   - 🟠 **Pendência**: Tarefas aguardando
   - 🔵 **Informação**: Avisos gerais

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React Native** | 0.85.3 | Framework mobile |
| **Expo** | 56.0.9 | Plataforma de desenvolvimento |
| **React Navigation** | 6.x | Navegação (Stack + Tabs) |
| **Zustand** | 4.4.7 | Gerenciamento de estado |
| **TypeScript** | 5.4.5 | Tipagem estática |
| **expo-camera** | 15.0.13 | Acesso à câmera (mockado na Sprint 2) |
| **expo-location** | 17.0.1 | Acesso a GPS (mockado na Sprint 2) |

---

## 📱 Recursos Nativos (Mockados)

Na Sprint 2, os recursos nativos ainda não capturam dados reais, mas a estrutura está pronta para integração na Sprint 3:

- **Câmera**: Placeholder para foto de vegetação
- **GPS**: Estrutura para registrar coordenadas
- **Notificações locais**: Sistema mockado pronto para push real

---

## 📦 Dependências Principais

```json
{
  "@react-navigation/bottom-tabs": "^6.5.20",
  "@react-navigation/native": "^6.1.17",
  "@react-navigation/stack": "^6.3.29",
  "expo": "~56.0.9",
  "expo-camera": "~15.0.13",
  "expo-location": "~17.0.1",
  "react": "19.2.3",
  "react-native": "0.85.3",
  "zustand": "^4.4.7"
}
```

Para instalar com sucesso:
```bash
npm install --legacy-peer-deps
```

---

## 🎨 UI/UX

- **Layout**: Mobile-first, responsivo para telas 320-480px
- **Componentes**: Native React Native (View, Text, ScrollView, FlatList, etc.)
- **Cores**: Temas por perfil (Azul/Verde) com status (Vermelho/Amarelo/Verde)
- **Ícones**: Unicode e texto (nenhuma biblioteca de ícones adicional)

---

## ✨ Próximos Passos (Sprint 3)

- [ ] Integração com API real (endpoints mockados → real)
- [ ] Autenticação corporativa com JWT
- [ ] Captura de foto real da câmera
- [ ] Localização real via GPS
- [ ] Push notifications
- [ ] Offline mode com sincronização
- [ ] Exportação de relatórios em PDF
- [ ] Visão computacional para detectar altura de vegetação

---

## 📸 Screenshots

*(Vídeo de demonstração: [em breve])*

---

## 👥 Integrantes (Sprint 2)

| Nome | RM | Função |
|------|-----|--------|
| André Nobrega | RM561754 | Arquitetura & Mobile |
| André Gouveia | RM564219 | Backend Integration |
| Caio Carminato | RM563630 | Frontend Components |
| Guilherme Tamai | RM563276 | UX/Design |
| Mirella Mascarenhas | RM562092 | Documentação |
| Vitor Komura | RM563694 | Testes & QA |

---

## 📄 Documentação Adicional

- **Sprint 1**: [../sprint1-hercules/README.md](../sprint1-hercules/README.md)
- **Requisitos funcionais**: `docs/requisitos.md`
- **Protótipo web**: https://sprint1-hercules.vercel.app/login

---

## 📞 Contato

Projeto acadêmico desenvolvido para o **Challenge CCR Motiva — FIAP 2026**.

---

## 📋 Checklist de Entrega Sprint 2

- [x] App funcional em React Native/Expo
- [x] Mínimo 3 telas (5 implementadas)
- [x] Navegação entre telas
- [x] Mock de dados estruturado
- [x] Fluxo completo funcional (Login → Dashboard → Trechos → Detalhes)
- [x] Autenticação por matrícula com role detection
- [x] 3 dashboards customizados (Gestor/Fiscal/Trabalhador)
- [x] Sistema de notificações
- [x] README com instruções
- [ ] Vídeo de demonstração (em gravação)
- [ ] Arquivo .txt com integrantes e links (em preparação)

---

**Última atualização**: junho de 2026
