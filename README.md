# VeroAI — Monitoramento Inteligente de Vegetação em Rodovias

> **Challenge CCR Motiva · Sprint 1 — Exploração, Requisitos e Protótipo**

---

## 🚀 Sprint 2 Disponível!

O **app mobile nativo em React Native/Expo** está pronto em [mobile/](mobile/). 

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

Ver [mobile/COMO_RODAR.md](mobile/COMO_RODAR.md) para instruções completas.

**Destaques Sprint 2:**
- ✅ 3 dashboards customizados (Gestor, Fiscal, Trabalhador)
- ✅ 5 telas funcionais com navegação dinâmica
- ✅ Sistema de notificações com badge
- ✅ Mock data realista (5 trechos SP-280, vistorias, intervenções)
- ✅ Código TypeScript com Zustand + React Navigation

---

## Contexto Regulatório

A conservação de rodovias concedidas no Brasil é regulada pela **ARTESP** (Agência de Transporte do Estado de São Paulo) e pela **ANTT** (Agência Nacional de Transportes Terrestres), que estabelecem padrões mínimos de manutenção das faixas de domínio, incluindo o controle da vegetação. Entre as exigências, destaca-se o limite de altura da vegetação nas margens das pistas: quando ultrapassa **30 cm**, a concessionária está sujeita a notificações, penalidades contratuais e multas administrativas.

A **Motiva**, concessionária do grupo CCR responsável pela operação de rodovias no Estado de São Paulo, mantém equipes de conservação distribuídas em regionais ao longo dos corredores concedidos. Essas equipes são compostas por **fiscais de campo**, **supervisores regionais** e **gestores operacionais**, cada um com responsabilidades distintas no ciclo de monitoramento, registro e intervenção sobre a vegetação.

O fluxo operacional atual envolve inspeções periódicas realizadas manualmente, com registros em planilhas e comunicação via rádio ou mensagem, sem padronização digital do processo. Essa lacuna tecnológica compromete a rastreabilidade das vistorias, dificulta a priorização de intervenções e expõe a Motiva a riscos regulatórios evitáveis.

---

## Descrição do Problema

O monitoramento da vegetação ao longo das rodovias concedidas à Motiva/CCR depende de inspeções visuais manuais, planilhas descentralizadas, cronogramas fixos e avaliações subjetivas dos fiscais de campo. Esse modelo gera falta de padronização nos registros, risco de cortes desnecessários ou tardios, atrasos em intervenções preventivas e exposição a autuações regulatórias pela ARTESP e ANTT quando a vegetação ultrapassa o limite de 30 cm estabelecido nos contratos de concessão.

---

## Integrantes

| Nome | RM |
|------|----|
| *(André Nobrega)* | *(RM561754)* |
| *(André Gouveia)* | *(RM564219)* |
| *(Caio Carminato)* | *(RM563630)* |
| *(Guilherme Tamai)* | *(RM563276)* |
| *(Mirella Mascarenhas)* | *(RM562092)* |
| *(Vitor Komura)* | *(RM563694)* |

---

## Persona Principal

Nome fictício: João Silva

Cargo: Fiscal de Conservação Rodoviária

Empresa: Motiva (concessionária CCR)

Regional: Regional Oeste — SP-280

Experiência: 8 anos no setor rodoviário

Perfil comportamental:

Realiza entre 3 e 6 inspeções de campo por dia, percorrendo trechos de rodovia a pé ou de veículo

Trabalha em ambientes com conectividade instável, exposição a sol, chuva e poeira

Não possui familiaridade com ferramentas tecnológicas complexas

Valoriza respostas rápidas, interfaces diretas e pouca digitação

Precisa registrar evidências fotográficas para respaldo em eventuais auditorias

Dores principais:

Preenchimento manual de planilhas após cada vistoria

Ausência de critério padronizado para classificar o risco da vegetação conforme exigência ARTESP

Dificuldade em priorizar qual trecho precisa de intervenção urgente

Risco de multa quando vegetação supera 30 cm sem registro formal da ocorrência

Expectativas com a solução:

Registrar uma vistoria completa em menos de 2 minutos

Saber imediatamente se o trecho está dentro ou fora do padrão regulatório

Ter evidência fotográfica vinculada ao registro para fins de auditoria

Receber recomendação automática de ação com prazo definido

---

## Proposta de Solução

O **VeroAI** é um aplicativo mobile para apoio ao monitoramento inteligente da vegetação em rodovias. O app permite que fiscais registrem vistorias por trecho, capturem e enviem fotos da vegetação com referência de estaca, insiram a altura estimada e recebam, automaticamente, a classificação de risco e a recomendação de ação correspondente — em conformidade com os critérios regulatórios da ARTESP e ANTT.

### Faixas de Classificação

| Altura | Classificação | Ação |
|--------|---------------|------|
| até 10 cm | OK | Monitoramento regular |
| 10 cm a 30 cm | Atenção | Roçada preventiva em 15 dias |
| acima de 30 cm | Crítico | Roçada imediata — risco de autuação regulatória |

---

## Stack Tecnológica

| Tecnologia | Versão | Papel |
|------------|--------|-------|
| Next.js | 16 | Framework principal (App Router) |
| React | 19 | Interface de usuário |
| TypeScript | 5 | Tipagem estática |
| Tailwind CSS | 4 | Estilização utility-first |
| Recharts | latest | Gráficos e visualizações de dados |
| Lucide React | latest | Ícones |
| Vercel | — | Hospedagem e deploy contínuo |

### Justificativa Técnica

Para a Sprint 1, optou-se por uma **aplicação web responsiva mobile-first** em vez de React Native/Expo, por três razões principais:

1. **Velocidade de prototipação:** Next.js com App Router permite criar e navegar entre telas sem necessidade de emulador, ambiente nativo ou build nativo — reduzindo drasticamente o tempo de setup e permitindo foco total na experiência do usuário.
2. **Deploy e avaliação imediatos:** A integração nativa com a Vercel gera um link público funcional em menos de dois minutos após o push no GitHub, viabilizando a entrega de um protótipo navegável real em substituição a wireframes estáticos no Figma.
3. **Base sólida para evolução:** A arquitetura de componentes React e a tipagem TypeScript adotadas nesta Sprint são diretamente reaproveitáveis na Sprint 2, seja mantendo a stack web (PWA) ou migrando para React Native com Expo — que compartilha a mesma linguagem, paradigma de componentes e ecossistema de bibliotecas.

---

## Funcionalidades Principais (Sprint 1)

- [x] Tela de login com autenticação simulada (matrícula + senha)
- [x] Dashboard com resumo de trechos críticos, gráfico de distribuição e barras de altura
- [x] Lista de trechos monitorados agrupados por dia da semana, ordenados por criticidade
- [x] Filtro e busca por código e município
- [x] Detalhe do trecho com histórico de vistorias e barra de progresso regulatório
- [x] Fluxo completo de nova vistoria em 4 passos:
  - [x] Identificação do trecho e fiscal
  - [x] Registro fotográfico simulado
  - [x] Inserção de altura com gauge visual e classificação automática
  - [x] Geração de recomendação de ação com prazo e prioridade
- [x] Relatório consolidado com gráficos de barras (Recharts) e índice de conformidade
- [x] Navegação por bottom navigation bar com indicador ativo
- [x] Layout mobile-first (max-width 430px) com frame de celular no desktop

---

## Requisitos Funcionais (RF)

| ID   | Descrição | Prioridade |
|------|------------|------------|
| RF01 | O sistema deve permitir o login do fiscal com matrícula e senha | Alta |
| RF02 | O sistema deve exibir um dashboard com resumo dos trechos por status de conformidade | Alta |
| RF03 | O sistema deve listar todos os trechos monitorados com status, altura e data da última vistoria | Alta |
| RF04 | O sistema deve agrupar os trechos por dia da semana da última vistoria | Média |
| RF05 | O sistema deve exibir os detalhes de cada trecho, incluindo histórico de vistorias | Alta |
| RF06 | O sistema deve permitir iniciar uma nova vistoria vinculada a um trecho específico | Alta |
| RF07 | O sistema deve permitir o registro ou simulação de fotografia da vegetação como evidência | Alta |
| RF08 | O sistema deve permitir ao fiscal informar a altura estimada da vegetação | Alta |
| RF09 | O sistema deve classificar automaticamente a vegetação em OK, Atenção ou Crítico com base nos limites regulatórios ARTESP/ANTT | Alta |
| RF10 | O sistema deve gerar uma recomendação de ação com prazo com base na classificação | Alta |
| RF11 | O sistema deve exibir um relatório consolidado com gráficos de altura por trecho e tendência mensal | Média |
| RF12 | O sistema deve exibir o índice de conformidade regulatória dos trechos | Média |
| RF13 | O sistema deve exibir alertas visuais destacados para trechos com status Crítico | Média |
| RF14 | O sistema deve registrar data, hora e fiscal responsável em cada vistoria | Alta |
| RF15 | O sistema deve ordenar trechos e alertas pela maior criticidade (maior altura primeiro) | Alta |

---

## Requisitos Não Funcionais (RNF)

| ID    | Descrição | Categoria |
|-------|------------|------------|
| RNF01 | A interface deve ser mobile-first, com largura máxima de 430px, adaptada ao uso em campo | Usabilidade |
| RNF02 | O tempo de carregamento de cada tela deve ser inferior a 2 segundos | Performance |
| RNF03 | A aplicação deve funcionar nos navegadores Chrome e Safari mobile | Compatibilidade |
| RNF04 | O sistema deve ser responsivo para diferentes tamanhos de tela mobile | Usabilidade |
| RNF05 | Os dados devem ser simulados localmente (mock) na Sprint 1, sem necessidade de backend real | Arquitetura |
| RNF06 | O código deve ser escrito em TypeScript com tipagem explícita para facilitar manutenção | Manutenibilidade |
| RNF07 | O deploy deve ser realizado na Vercel com CI/CD automático via GitHub | Infraestrutura |
| RNF08 | A aplicação não deve armazenar dados sensíveis no cliente | Segurança |
| RNF09 | A classificação de risco deve seguir estritamente os limites regulatórios definidos pela ARTESP/ANTT | Conformidade |

---

## Restrições Técnicas

- Não há backend real na Sprint 1; todos os dados são simulados por arquivos mock locais.
- A funcionalidade de câmera real é simulada por um botão de placeholder.
- Exportação de relatório em PDF não está disponível na Sprint 1.
- A classificação por visão computacional (CNN) é prevista para Sprint 2.
- A autenticação corporativa com integração ao sistema da Motiva não está implementada no protótipo.

---

## Protótipo Navegável

O protótipo foi desenvolvido como **aplicação web responsiva mobile-first**, simulando a experiência de uso de um aplicativo nativo. A escolha por um site responsivo hospedado na Vercel, em substituição ao Figma, permite ao avaliador percorrer o fluxo principal completo com interações reais — navegação entre telas, formulários funcionais, lógica de classificação automática e transições de estado — sem necessidade de instruções adicionais.

Para passar da tela de login coloque qualquer letra ou numero!

Link do app: https://sprint1-hercules.vercel.app/login

**Fluxo principal:**
`Login → Dashboard → Trechos → Detalhe → Nova Vistoria → Foto → Classificação → Recomendação → Relatório`

---

## Como Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/AndreNobrega125/sprint2-hercules.git
cd sprint2-hercules

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

Para simular a experiência mobile, pressione `F12` no Chrome e ative o modo de dispositivo móvel (iPhone 14 Pro recomendado).

### App Mobile (Sprint 2)

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

Com o **Android Studio** aberto e um emulador Android em execução, pressione `a` no terminal para instalar e abrir o app no emulador.

Ver [mobile/COMO_RODAR.md](mobile/COMO_RODAR.md) para instruções completas.

---

## Status do Projeto

| Sprint | Status | Entrega |
|--------|--------|---------|
| Sprint 1 — Exploração, Requisitos e Protótipo | ✅ Concluída | Mai/2026 |
| Sprint 2 — App Mobile Nativo (React Native/Expo) | ✅ Concluída | Junho/2026 |

---

## Fotos do nosso MVP: 

| Tela de login | Tela inicial | Tela com os trechos | Cadastro vistoria |
|---|---|---|---|
| ![](docs/Tela%20login.png) | ![](docs/Tela%20inicio.png) | ![](docs/Tela%20trecho.png) | ![](docs/vistoria.png) |

| Tela trecho com fotos | Classifica vegetação | Tela recomendação | Tela relatório |
|---|---|---|---|
| ![](docs/Registro%20foto.png) | ![](docs/Vegetação.png) | ![](docs/Recomendação.png) | ![](docs/Tela%20relatório.png) |

---

Projeto acadêmico desenvolvido para o **Challenge CCR Motiva — FIAP 2026**.
