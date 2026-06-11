#!/bin/bash

echo ""
echo "========================================"
echo "VeroAI Sprint 2 - Setup Automatico"
echo "========================================"
echo ""

echo "[1/3] Limpando node_modules e cache..."
rm -rf node_modules 2>/dev/null
rm -f package-lock.json 2>/dev/null
echo "OK"

echo ""
echo "[2/3] Instalando dependencias..."
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "ERRO na instalacao!"
    exit 1
fi
echo "OK"

echo ""
echo "[3/3] Iniciando Expo..."
echo ""
echo "========================================"
echo "App abrira automaticamente no navegador"
echo "========================================"
echo ""
echo "Contas de teste:"
echo "  - Gestor: 100001"
echo "  - Fiscal: 200001"
echo "  - Trabalhador: 300001"
echo ""
echo "========================================"
echo ""

npx expo start --web
