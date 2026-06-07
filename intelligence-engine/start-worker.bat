@echo off
cd /d "%~dp0"
if not exist .venv (
  python -m venv .venv
  .venv\Scripts\python.exe -m pip install -r requirements.txt
)
if not exist .env (
  echo Copy .env.example to .env and set DATABASE_URL before starting.
  copy .env.example .env
  pause
  exit /b 1
)
set PYTHONPATH=%CD%
.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
