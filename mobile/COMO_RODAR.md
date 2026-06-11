# 🚀 VeroAI Sprint 2 — Como Rodar o App

## ⚡ Comando Rápido (Copiar e Colar)

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

---

## 📝 Passo a Passo

### 1️⃣ Navegar até a pasta do app
```bash
cd mobile
```

### 2️⃣ Instalar dependências
```bash
npm install --legacy-peer-deps
```

⚠️ **Importante**: Use `--legacy-peer-deps` para evitar conflitos de versão do React

### 3️⃣ Iniciar o Expo
```bash
npx expo start
```

Você verá um QR code no terminal.

---

## 📱 Executar em Dispositivo/Emulador

### Opção 1: Expo Go App (Mais Rápido)
1. Abrir **Expo Go** no celular (iOS App Store ou Google Play)
2. Escanear o **QR code** que aparece no terminal
3. App abre no celular automaticamente

### Opção 2: Android Emulator (Melhor Performance)
```bash
# No terminal onde rodar "npx expo start", pressione:
a
```

### Opção 3: iOS Simulator (Mac apenas)
```bash
# No terminal onde rodar "npx expo start", pressione:
i
```

### Opção 4: Web Browser
```bash
# No terminal onde rodar "npx expo start", pressione:
w
```

---

## 🔐 Contas de Teste

| Matrícula | Perfil | Nome |
|-----------|--------|------|
| **G101** | Gestor | Gestor |
| **F101** | Fiscal | Fiscal |
| **T101** | Trabalhador | Trabalhador |

**Senha**: Qualquer valor (não validada na Sprint 2)

---

## ❌ Se Algo Der Erro

### Erro: Module not found
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Erro: Port already in use
```bash
npx expo start -c  # -c para limpar cache
```

### Erro: TypeScript
```bash
npx tsc --noEmit  # Verificar erros
```

---

## 📍 Estrutura de Pastas

```
sprint2-hercules/
├── README.md                    ← Sprint 1 (web)
├── package.json                 ← Sprint 1 (Next.js)
├── app/                         ← Rotas Next.js (Sprint 1)
├── mobile/                      ← Sprint 2 (Mobile) ⭐
│   ├── src/
│   ├── App.tsx
│   ├── app.json
│   ├── package.json             ← Use ESTE package.json
│   ├── README.md                ← Documentação completa
│   ├── QUICK_START.md
│   ├── VIDEO_SCRIPT.md
│   └── ... (código Expo)
├── components/                  ← Sprint 1 (web)
├── lib/                         ← Sprint 1 (web)
└── ... (arquivos Next.js)
```

---

## 🎯 Fluxo Principal para Testar

1. **Login**
   - Inserir matrícula: `G101` (Gestor) | `F101` (Fiscal) | `T101` (Trabalhador)
   - Clicar "Entrar"

2. **Dashboard**
   - Cada perfil mostra um dashboard diferente
   - Cores: Azul (Gestor), Azul claro (Fiscal), Verde (Trabalhador)

3. **Trechos**
   - Tap na aba "Trechos" (bottom tabs)
   - Ver lista de 5 trechos SP-280
   - Filtrar ou ordenar

4. **Detalhe**
   - Tap em um trecho
   - Ver histórico de vistorias
   - Ver intervenções recomendadas

5. **Notificações**
   - Tap na aba "Notificações"
   - Ver alertas, conclusões, pendências
   - Marcar como lida

---

## 📚 Documentação

Dentro da pasta `mobile/`:
- **README.md** - Documentação completa
- **QUICK_START.md** - Guia rápido
- **VIDEO_SCRIPT.md** - Roteiro para vídeo
- **SPRINT2_SUMMARY.md** - Sumário técnico

---

## 🆘 Precisa de Ajuda?

```bash
# Ver versão do Expo
npx expo --version

# Limpar tudo e começar do zero
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npx expo start

# Verificar erros TypeScript
npx tsc --noEmit
```

---

## ✨ Stack Técnico

- React Native 0.85.3
- Expo 56.0.9
- React Navigation 6.x
- Zustand 4.4.7
- TypeScript 5.4.5

---

## 🎬 Gravando Vídeo

Ver `VIDEO_SCRIPT.md` para roteiro completo (3 minutos)

---

**Versão**: 2.0.0 Sprint 2  
**Status**: ✅ Pronto para rodar  
**Tempo de setup**: 2-3 minutos  

---

🚀 **Boa sorte!**
