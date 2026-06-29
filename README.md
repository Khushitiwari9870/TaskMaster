# TaskMaster

Full-stack project management app (minimal scaffold)

Backend (Django + DRF + Channels) and Frontend (React)

## Quick start

1. Backend

```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

2. Frontend

```bash
cd frontend
npm install
npm start
```

Default backend runs at `http://localhost:8000/` and frontend at `http://localhost:3000/`.

JWT endpoints:
- POST `/api/auth/login/` with `{username,password}` to receive `access` and `refresh` tokens.
- POST `/api/auth/register/` to create user.

WebSocket:
- `ws://localhost:8000/ws/projects/<project_id>/`

This is a minimal working scaffold. Extend models, permissions, validation, and UI as needed.
