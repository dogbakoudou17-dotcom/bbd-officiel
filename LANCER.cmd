@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js est necessaire. Installez la version LTS gratuite depuis nodejs.org.
 pause
 exit /b 1
)
node build.mjs
if errorlevel 1 (pause & exit /b 1)
start "BBD Officiel" "http://127.0.0.1:4173/"
echo Gardez cette fenetre ouverte pendant la visite. Ctrl+C pour arreter.
node preview.mjs
pause
