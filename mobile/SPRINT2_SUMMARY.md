# VeroAI Sprint 2 — Sumário de Entrega

## 🎯 Objetivos Alcançados

✅ **App React Native/Expo funcional** com 5 telas principais  
✅ **3 dashboards customizados** (Gestor, Fiscal, Trabalhador)  
✅ **Autenticação por matrícula** com role detection automático  
✅ **Sistema de notificações** com contador e marcação de leitura  
✅ **Mock de dados realistas** baseado em rodovia SP-280  
✅ **Navegação dinâmica** (Stack + Bottom Tabs por perfil)  
✅ **Código TypeScript** com tipagem explícita  
✅ **README completo** com instruções de instalação e uso  

---

## 📦 Arquivos Criados/Modificados

### Estrutura Principal
```
veroai-mobile/
├── src/
│   ├── types/index.ts              ← Tipos TypeScript
│   ├── screens/                    ← 5 telas principais
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardGestor.tsx
│   │   ├── DashboardFiscal.tsx
│   │   ├── DashboardTrabalhador.tsx
│   │   ├── ListaTrechos.tsx
│   │   ├── TrechoDetalhe.tsx
│   │   ├── NovaVistoria.tsx
│   │   └── NotificacoesScreen.tsx
│   ├── context/                    ← Zustand stores
│   │   ├── authStore.ts
│   │   ├── dataStore.ts
│   │   └── notificationStore.ts
│   ├── mocks/index.ts              ← Dados mockados
│   └── navigation/index.tsx        ← Navegação
├── App.tsx                         ← Entrada
├── app.json                        ← Config Expo
├── tsconfig.json                   ← TypeScript config
├── package.json                    ← Dependências (atualizado)
├── README.md                       ← Documentação ⭐
└── .gitignore                      ← Git ignore (pré-existente)
```

---

## 🎮 Funcionalidades

### 1. Autenticação (LoginScreen)
- Login com matrícula (sem validação de senha)
- Role detection automático: `1xxxxx → Gestor`, `2xxxxx → Fiscal`, `3xxxxx → Trabalhador`
- Exemplo: `100001` automaticamente detecta Gestor

### 2. Dashboards (3 variantes)

#### Gestor (Azul #1976d2)
- KPIs: Total, OK, Atenção, Crítico
- Taxa de conformidade regulatória
- Controle de intervenções
- Centro de notificações

#### Fiscal (Azul claro #2196f3)
- Trechos críticos destacados
- Trechos em atenção
- Ação rápida: "Nova Vistoria"
- Notificações de trechos pendentes

#### Trabalhador (Verde #2e7d32)
- Tarefas de hoje: Pendentes, Em Andamento, Concluídas
- Listagem de trechos para roçada (altura > 30cm)
- Histórico de intervenções realizadas
- Notificações de novas tarefas

### 3. Lista de Trechos
- 5 trechos SP-280 da Motiva
- Filtro por código ou município
- Ordenação por criticidade ou nome
- Status visual (OK/ATENÇÃO/CRÍTICO)

### 4. Detalhes do Trecho
- Informações gerais, KM, Regional
- Histórico de vistorias
- Histórico de intervenções
- Botão para registrar nova vistoria

### 5. Nova Vistoria (3 passos)
- **Passo 1**: Selecionar trecho
- **Passo 2**: Capturar foto (mockado)
- **Passo 3**: Informar altura e gerar classificação automática

### 6. Notificações
- Badge com contador de não lidas
- Marcar como lida
- Marcar todas como lidas
- Deletar notificação

---

## 📊 Dados Mockados

### 5 Trechos (SP-280)
```
SP280-KM50 | Osasco   | 35cm | CRÍTICO  ← Roçada imediata
SP280-KM55 | Osasco   | 22cm | ATENÇÃO  ← Roçada em 15 dias
SP280-KM60 | Itapevi  | 8cm  | OK       ← Monitoramento regular
SP280-KM65 | Itapevi  | 38cm | CRÍTICO  ← Roçada imediata
SP280-KM70 | Jandira  | 28cm | ATENÇÃO  ← Roçada em 15 dias
```

### Classificação de Risco
- **< 10cm**: OK
- **10-30cm**: ATENÇÃO
- **> 30cm**: CRÍTICO

### 3 Vistorias, 4 Intervenções, 3 Notificações
Todos estruturados e realistas no contexto da Motiva.

---

## 🔐 Contas de Teste

| Matrícula | Perfil | Nome | 
|-----------|--------|------|
| 100001 | Gestor | Carlos Silva |
| 200001 | Fiscal | João Fiscal |
| 300001 | Trabalhador | Pedro Trabalhador |

**Qualquer outra matrícula é aceita** (padrão = Fiscal)

---

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
cd veroai-mobile
npm install --legacy-peer-deps
```

### 2. Iniciar Expo
```bash
npm start
```

### 3. Executar em:
- **Android**: `npm run android`
- **iOS**: `npm run ios` (Mac apenas)
- **Web**: `npm run web`
- **Expo Go**: Escanear QR code no terminal

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React Native | 0.85.3 | Framework mobile |
| Expo | 56.0.9 | Plataforma desenvolvimento |
| React Navigation | 6.x | Stack + Bottom Tabs |
| Zustand | 4.4.7 | Gerenciamento estado |
| TypeScript | 5.4.5 | Tipagem estática |
| expo-camera | 15.0.13 | Preparado para Sprint 3 |
| expo-location | 17.0.1 | Preparado para Sprint 3 |

---

## ✨ Destaques Técnicos

✓ **TypeScript com tipagem explícita** em todo o código  
✓ **Zustand para estado global** (simples e eficaz)  
✓ **React Navigation dinâmica** (tabs mudam por role)  
✓ **Estrutura modular** pronta para integração com APIs  
✓ **Code splitting** por feature (screens, context, mocks)  
✓ **Sem bibliotecas extras desnecessárias** (minimalista)  

---

## 📋 Checklist de Entrega

### Funcionalidade (40 pontos)
- ✅ App funcional com navegação
- ✅ Fluxo principal completo
- ✅ Mock de dados realistas e contextualizados
- ✅ 3 perfis com dashboards customizados

### Organização (30 pontos)
- ✅ Estrutura clara de pastas
- ✅ Separação de componentes e lógica
- ✅ TypeScript com tipagem explícita
- ✅ Código legível e manutenível

### Qualidade (30 pontos)
- ⏳ Vídeo de demonstração (em preparação)
- ✅ Evolução visível em relação à Sprint 1

---

## 📝 Documentação

- **README.md**: Instruções completas, contas de teste, features
- **ENTREGA_SPRINT2.txt**: Sumário para entrega final
- **src/types/index.ts**: Tipos TypeScript bem documentados
- **Código fonte**: Comentários em pontos críticos

---

## 🔄 Fluxo Principal (Testável)

1. **Login**
   - Inserir matrícula (100001, 200001 ou 300001)
   - Clicar "Entrar"

2. **Dashboard Personalizado**
   - Cada perfil vê seu próprio dashboard
   - Métricas e cores diferentes

3. **Lista de Trechos**
   - Filtro e busca funcionam
   - Status visual com cores

4. **Detalhe do Trecho**
   - Histórico de vistorias
   - Histórico de intervenções

5. **Notificações**
   - Badge mostra contador
   - Tap marca como lido

---

## 📸 Próximos Passos (Sprint 3)

- [ ] Integração com API real
- [ ] Autenticação corporativa (JWT)
- [ ] Câmera real para fotos
- [ ] GPS real para coordenadas
- [ ] Push notifications
- [ ] Offline mode com sincronização
- [ ] Exportação de relatórios PDF

---

## 👥 Integrantes

| Nome | RM | 
|------|-----|
| André Nobrega | RM561754 |
| André Gouveia | RM564219 |
| Caio Carminato | RM563630 |
| Guilherme Tamai | RM563276 |
| Mirella Mascarenhas | RM562092 |
| Vitor Komura | RM563694 |

---

## 📬 Para Entrega

**Arquivo .txt com:**
```
André Nobrega - RM561754
André Gouveia - RM564219
Caio Carminato - RM563630
Guilherme Tamai - RM563276
Mirella Mascarenhas - RM562092
Vitor Komura - RM563694

GitHub: https://github.com/AndreNobrega125/veroai-mobile-sprint2
Vídeo: [link do YouTube não listado]
```

---

**Status**: ✅ Desenvolvimento concluído | Pronto para gravação de vídeo e entrega final

**Última atualização**: Junho 2026
