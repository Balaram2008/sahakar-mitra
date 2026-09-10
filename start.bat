@echo off
title Sahakara Mitra - 28 States & AP Cooperative Kisan AI Portal
echo ========================================================
echo Starting Sahakara Mitra Cooperative AI Web & Kiosk Portal...
echo Covering all 28 States & Ministry of Cooperation
echo ========================================================
where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    py -3 server.py
) else (
    python server.py
)
pause