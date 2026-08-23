@echo off
echo =========================================
echo SKY-TIB ONE-CLICK SETUP
echo =========================================
echo.

echo [1/3] Checking Prerequisites...
node -v >nul 2>&1 || (echo ERROR: Node.js is not installed. Please install Node v20+. && exit /b 1)
python --version >nul 2>&1 || (echo ERROR: Python is not installed. Please install Python 3.11+. && exit /b 1)
echo Prerequisites OK.
echo.

echo [2/3] Installing Web & Python Dependencies...
call npm install
pip install Pillow requests
echo Dependencies OK.
echo.

echo [3/3] Initializing Telemetry Feed...
python scripts/fetch_sky_tib.py
echo Initial Ingestion OK.
echo.

echo =========================================
echo SETUP COMPLETE.
echo.
echo Run 'npm run dev' to launch the dashboard.
echo =========================================
pause
