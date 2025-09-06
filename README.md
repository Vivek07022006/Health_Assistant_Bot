# Health_Assistant_Bot
🏥 HealthCare Chatbot

A simple AI-powered healthcare chatbot built with Flask (Python backend) + React frontend.
The chatbot uses Google Gemini AI to provide responses related to health, fitness, diet, medical awareness, mental health, and wellness.
It strictly avoids answering non-health-related queries.

🚀 Features

🤖 AI-powered healthcare responses using Gemini API

🌐 Frontend built with React + TailwindCSS

🔥 Flask backend with REST API endpoints

🧠 Smart filtering → responds only to health-related topics

🔑 Environment variable-based API key handling

🎨 Clean UI with login and chat components

🛠️ Tech Stack

Frontend: React, TailwindCSS, Axios

Backend: Flask, Flask-CORS

AI Model: Google Gemini 1.5 Flash

Other Tools: dotenv, requests
---
⚡ Getting Started
1️⃣ Clone the Repository
```bash
git clone https://github.com/Vivek07022006/Health_Assistant_Bot.git
cd healthcare-chatbot
```

2️⃣ Backend Setup (Flask)
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt


Create a .env file in backend/:

GEMINI_API_KEY=your_api_key_here


Run Flask server:
```bash
python app.py
```

➡️ Backend runs on http://127.0.0.1:5000

3️⃣ Frontend Setup (React)
```bash
cd frontend

npm install

npm run dev
```

➡️ Frontend runs on http://localhost:5173
---
📌 API Endpoints
POST /chat

Request:

{
  "message": "What are the symptoms of diabetes?"
}


Response:

{
  "response": "Common symptoms of diabetes include increased thirst, frequent urination, fatigue, and blurred vision."
}
---
🧩 Project Structure
healthcare-chatbot/
│── backend/
│   ├── app.py          # Flask app with Gemini integration
│   ├── requirements.txt
│   └── .env
│
│── frontend/
│   ├── src/
│   │   ├── components/ # React components (Login, Chat, Dashboard)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
---
🛡️ Notes

The bot will only respond to health-related queries.

If asked something unrelated, it replies:

"Sorry, I don’t have access to other resources, I’m a Health care bot."

👨‍💻 Run Commands Quick Reference
---
# Backend

```bash
cd backend

python app.py
```
# Frontend

```bash
cd frontend

npm run dev
```