@echo off
REM VeroAI - Script para rodar o app automaticamente

echo.
echo ========================================
echo VeroAI Sprint 2 - Setup Automatico
echo ========================================
echo.

echo [1/3] Limpando node_modules e cache...
if exist node_modules (
    rmdir /s /q node_modules >nul 2>&1
)
if exist package-lock.json (
    del package-lock.json >nul 2>&1
)
echo OK

echo.
echo [2/3] Instalando dependencias...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ERRO na instalacao!
    pause
    exit /b 1
)
echo OK

echo.
echo [3/3] Iniciando Expo...
echo.
echo ========================================
echo App abrira automaticamente no navegador
echo ========================================
echo.
echo Contas de teste:
echo   - Gestor: 100001
echo   - Fiscal: 200001
echo   - Trabalhador: 300001
echo.
echo ========================================
echo.

call npx expo start --web

pause
