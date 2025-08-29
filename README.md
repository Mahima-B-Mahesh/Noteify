# 📝 Notes App

A **full-stack Notes Application** built with **Django REST Framework (backend)** and **React + Vite (frontend)**.  
Supports authentication, JWT tokens, note creation, editing, searching, filtering, and categories.

---

## 🚀 Features
- User **signup & login** (JWT authentication)
- Create, edit, delete notes
- Search notes by title/body/category
- Filter notes by category (Business, Personal, Important, etc.)
- Protected API endpoints
- SQLite for local development

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS (or your CSS setup)  
- **Backend**: Django, Django REST Framework, djangorestframework-simplejwt  
- **Database**: SQLite (default)  
- **Auth**: JWT (Access + Refresh Tokens)

---

## 📂 Project Structure
notes-app/
│
├── backend/ # Django backend
│ ├── manage.py
│ ├── requirements.txt
│ └── .env # Django secrets (ignored in git)
│
├── frontend/ # React frontend
│ ├── package.json
│ └── .env # API URL config (ignored in git)
│
├── .gitignore
└── README.md


## ⚙️ Setup Instructions

### 1️⃣ Backend (Django)

cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start backend server
python manage.py runserver 8004
Backend runs at:
👉 http://127.0.0.1:8004/

2️⃣ Frontend (React + Vite)

cd frontend
npm install
npm run dev
Frontend runs at:
👉 http://localhost:5173/

🔑 Environment Variables
Backend .env (in backend/)

SECRET_KEY=supersecretkey123
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
Frontend .env (in frontend/)

VITE_API_URL=http://127.0.0.1:8004
📌 API Endpoints
POST /accounts/register/ → Register user

POST /accounts/login/ → Login, returns tokens

GET /notes/ → List all notes (auth required)

POST /notes/ → Create note

GET /notes/:slug/ → Get note details

PUT /notes/:slug/ → Update note

DELETE /notes/:slug/ → Delete note

✅ TODO (Future Improvements)
Deploy backend (Heroku / Railway / Render)

Deploy frontend (Vercel / Netlify)

Add pagination for notes

Add file/image attachments

👩‍💻 Author
Built by Mahima B Mahesh ✨
