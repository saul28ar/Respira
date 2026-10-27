@echo off
title Respira - Tu espacio de calma
cd /d "%~dp0"
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0Servidor.ps1"
if errorlevel 1 pause
