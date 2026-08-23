@echo off
setlocal enabledelayedexpansion
echo =========================================
echo SKY-TIB ONE-CLICK SETUP
echo =========================================
echo.

echo [1/3] Checking Prerequisites...
node -v >nul 2>&1 || (echo ERROR: Node.js is not installed. Install Node v20+. && exit /b 1)
set PYTHON_CMD=
py --version >nul 2>&1 && set PYTHON_CMD=py
if not defined PYTHON_CMD (
  python --version >nul 2>&1 && set PYTHON_CMD=python
)
if not defined PYTHON_CMD (
  echo ERROR: Python launcher ^(py^) or Python runtime not detected.
  exit /b 1
)
echo Node.js: OK
echo Python Runtime: OK (!PYTHON_CMD!)
echo.

echo [2/3] Installing Dependencies...
call npm install
!PYTHON_CMD! -m pip install -r requirements.txt
echo Dependencies: OK
echo.

echo [3/3] Ingesting Initial Telemetry Data...
!PYTHON_CMD! src/pipeline.py
echo Ingestion: OK
echo.

echo =========================================
echo SETUP COMPLETE. LAUNCHING DASHBOARD...
echo =========================================
echo.
call npm run dev
pause
