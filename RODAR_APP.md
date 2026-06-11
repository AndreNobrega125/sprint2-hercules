# VeroAI — Como Rodar Sprint 1 e Sprint 2

## 🌐 Sprint 1: Protótipo Web (Next.js)

```bash
npm install
npm run dev
```

Abrir: **http://localhost:3000**

---

## 📱 Sprint 2: App Mobile (React Native/Expo)

```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

**Depois:**
- Escanear QR code com **Expo Go**
- Ou pressionar `a` para **Android Emulator**
- Ou pressionar `w` para **Web**

---

## 🔐 Contas de Teste (Sprint 2)

| Matrícula | Perfil | Nome |
|-----------|--------|------|
| 100001 | Gestor | Carlos Silva |
| 200001 | Fiscal | João Fiscal |
| 300001 | Trabalhador | Pedro Trabalhador |

---

## 📁 Estrutura

```
sprint2-hercules/
├── README.md              ← Sprint 1 info
├── RODAR_APP.md          ← Este arquivo
├── package.json          ← Sprint 1 dependencies
├── app/                  ← Rotas Next.js (Sprint 1)
├── mobile/               ← Sprint 2 ⭐
│   ├── COMO_RODAR.md
│   ├── README.md
│   ├── package.json
│   └── ... (código Expo)
└── ... (código Next.js)
```

---

## ⚡ Quick Commands

**Sprint 1 (Web):**
```bash
npm install && npm run dev
```

**Sprint 2 (Mobile):**
```bash
cd mobile && npm install --legacy-peer-deps && npx expo start
```

---

Ver `mobile/COMO_RODAR.md` para detalhes completos da Sprint 2.
