# VeroAI Sprint 2 — Script de Demonstração em Vídeo (até 3 minutos)

## 📹 Estrutura do Vídeo

**Duração**: 2:30 a 3:00 minutos  
**Objetivo**: Demonstrar o app funcional com 3 perfis diferentes

---

## 🎬 Cenas (com timings aproximados)

### Cena 1: Introdução (0:00 - 0:20)
**"VeroAI - Monitoramento Inteligente de Vegetação em Rodovias"**
- Mostrar tela de login
- Mencionar que o app foi criado em React Native com Expo
- Sprint 2 evolui o protótipo web da Sprint 1

**O que falar:**
> "Olá! Este é o VeroAI, um aplicativo mobile para monitorar vegetação em rodovias da Motiva. Desenvolvemos em React Native com 3 perfis diferentes: Gestor, Fiscal e Trabalhador. Cada um tem um dashboard personalizado e fluxos específicos."

---

### Cena 2: Login - Perfil Gestor (0:20 - 0:50)
**Tempo**: 30s

**Ações:**
1. Na tela de login, inserir matrícula: `100001`
2. Clicar "Entrar"
3. Esperar carregar o Dashboard do Gestor

**O que falar:**
> "Vamos começar com o Gestor. Usamos matrícula 100001. O app detecta automaticamente o perfil pela matrícula. Após o login, vemos o dashboard com KPIs: total de trechos, quantos estão OK, em atenção ou críticos. Temos também a taxa de conformidade regulatória que o Gestor precisa acompanhar."

**Elementos a destacar:**
- Cards de estatísticas (OK, Atenção, Crítico)
- Barra de conformidade
- Card de intervenções
- Badge de notificações

---

### Cena 3: Dashboard Gestor - Navegação (0:50 - 1:10)
**Tempo**: 20s

**Ações:**
1. Rolar para baixo no dashboard
2. Clicar em "Ver Todos os Trechos"
3. Mostrar a lista com filtros

**O que falar:**
> "O dashboard mostra alertas destacados. Abaixo, temos botões rápidos como 'Ver Todos os Trechos'. Aqui na lista, podemos filtrar por código ou município e ordenar por criticidade."

**Elementos a destacar:**
- Filtro e busca funcionando
- Ordenação por criticidade mostrando trechos críticos no topo
- Cores diferenciadas (vermelho/laranja/verde)

---

### Cena 4: Detalhe do Trecho (1:10 - 1:40)
**Tempo**: 30s

**Ações:**
1. Clicar em um trecho crítico (ex: SP280-KM50)
2. Mostrar detalhes: código, endereço, altura atual (35cm), status
3. Rolar para ver histórico de vistorias
4. Mostrar histórico de intervenções

**O que falar:**
> "Ao clicar em um trecho, vemos os detalhes completos. Este é o SP280-KM50 em Osasco com 35cm de vegetação - status CRÍTICO. Abaixo, temos todo o histórico de vistorias com datas, alturas e observações. E aqui, o histórico de intervenções mostrando o que precisa ser feito."

**Elementos a destacar:**
- Status visual (CRÍTICO em vermelho)
- Altura em destaque
- Histórico de vistorias com coordenadas
- Intervenções com prioridade

---

### Cena 5: Trocar Perfil - Fiscal (1:40 - 2:00)
**Tempo**: 20s

**Ações:**
1. Voltar ao login (clicar "Sair" no header ou logout)
2. Inserir matrícula: `200001`
3. Mostrar dashboard do Fiscal

**O que falar:**
> "Agora vamos ao Fiscal com matrícula 200001. O dashboard muda completamente. Aqui o Fiscal vê os trechos críticos e em atenção de forma diferente, com foco nos lugares onde precisa fazer vistoria. Tem também o botão 'Nova Vistoria' destacado."

**Elementos a destacar:**
- Cores diferentes (azul mais claro)
- Card de "Trechos Críticos"
- Botão "Nova Vistoria" em destaque
- Badge de notificações no bottom tab

---

### Cena 6: Sistema de Notificações (2:00 - 2:25)
**Tempo**: 25s

**Ações:**
1. Clicar na aba de "Notificações" (bottom tab)
2. Mostrar notificações com badge
3. Clicar em uma notificação para marcar como lida
4. Mostrar opção "Marcar todas como lidas"

**O que falar:**
> "O app tem um sistema de notificações robusto. Vemos aqui um badge mostrando 3 notificações não lidas. Ao clicar em uma, ela é marcada como lida. E temos a opção de marcar todas como lidas de uma vez. As notificações são contextualizadas - alertas de trechos críticos, conclusões de tarefas, e pendências."

**Elementos a destacar:**
- Badge counter funcionando
- Diferentes tipos de notificação (alerta/conclusão/pendência)
- Marcação de leitura
- Botão de deletar notificação

---

### Cena 7: Fluxo de Nova Vistoria (2:25 - 2:55)
**Tempo**: 30s

**Ações:**
1. Voltar ao Dashboard do Fiscal
2. Clicar "Nova Vistoria"
3. Mostrar Passo 1: Selecionar trecho (SP280-KM55)
4. Ir para Passo 2: Capturar foto (clicar botão)
5. Ir para Passo 3: Informar altura (ex: 22cm)
6. Mostrar status automático gerado (ATENÇÃO)
7. Clicar "Registrar Vistoria"

**O que falar:**
> "Aqui está o fluxo de Nova Vistoria com 3 passos. Primeiro selecionamos o trecho. Segundo, capturamos a foto. E terceiro, informamos a altura. Vamos colocar 22cm - note que o app automaticamente classifica como ATENÇÃO. Ao confirmar, a vistoria é registrada e o status do trecho é atualizado em tempo real."

**Elementos a destacar:**
- Seleção visual do trecho
- Status do formulário (steps 1/2/3)
- Classificação automática (OK/ATENÇÃO/CRÍTICO)
- Cor da classificação mudando conforme altura
- Confirmação de sucesso

---

### Cena 8: Trocar Perfil - Trabalhador (2:55 - 3:00)
**Tempo**: 5s

**Ações:**
1. Voltar ao login
2. Inserir matrícula: `300001`
3. Mostrar dashboard do Trabalhador

**O que falar:**
> "Por fim, temos o Trabalhador com matrícula 300001. O dashboard mostra as tarefas do dia: quantas estão pendentes, em andamento, e concluídas. O Trabalhador vê os trechos que precisa fazer a roçada e pode marcar como concluído quando termina."

**Elementos a destacar:**
- Cores verde (tema Trabalhador)
- Cards de tarefas
- Listagem de trechos para roçada
- Status das intervenções

---

## 📍 Checklist para Gravação

- [ ] App compilando sem erros (npm start funciona)
- [ ] 3 contas de teste criadas (100001, 200001, 300001)
- [ ] Testes em emulador Android ou Expo Go
- [ ] Áudio claro e sem barulhos
- [ ] Vídeo em resolução decente (720p+ recomendado)
- [ ] Iluminação adequada da tela
- [ ] Narração preparada e pausada
- [ ] Velocidade normal (sem aceleração) para fácil seguimento
- [ ] Transições suaves entre cenas

---

## 🎥 Equipamentos Mínimos

- Computador com Expo rodando (Android Emulator ou Expo Go no celular)
- Gravador de tela (Windows: Xbox Game Bar; Mac: QuickTime; Linux: OBS)
- Microfone adequado (headset ou externo)
- Software de edição simples (caso necessário ajustes)

---

## 📤 Após Gravação

1. Exportar em MP4 (H.264, 1280x720 mínimo)
2. Upload no YouTube **não listado** (para não indexar em buscas)
3. Copiar link
4. Colar no arquivo .txt de entrega junto com GitHub e integrantes

---

## ⏱️ Timing Total: 3:00 minutos

```
[0:00 - 0:20] Introdução
[0:20 - 0:50] Login Gestor
[0:50 - 1:10] Dashboard Gestor
[1:10 - 1:40] Detalhe Trecho
[1:40 - 2:00] Switch para Fiscal
[2:00 - 2:25] Notificações
[2:25 - 2:55] Fluxo Nova Vistoria
[2:55 - 3:00] Trabalhador
```

---

## 💡 Dicas Extras

- **Pause um pouco em cada tela** para que a audiência consiga acompanhar
- **Fale com clareza** mas natural (não é um audiobook)
- **Mostre as cores e UX** - estética conta na avaliação
- **Mencione o Context: Motiva, rodovias, regulações ARTESP/ANTT** - mostra que entendeu o problema
- **Destaque a evolução de Sprint 1** - web responsiva → app nativo com 3 perfis

---

**Pronto para gravar!** 🎬
