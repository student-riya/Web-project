# Multipurpose Finance Transaction & Expense Tracker

A full-stack React + Django web app to manage, visualize, and track income and expenses efficiently.
It provides real-time transaction management, graphical analysis, and categorized expense tracking — all through a clean, responsive UI inspired by modern fintech dashboards.
---

🧠 Overview

The Multipurpose Finance Transaction & Expense Tracker helps users organize their financial activities — from bill payments and fund transfers to recharges and e-commerce purchases.
It supports authentication, CRUD operations, and dynamic visualizations using charts for smarter spending insights.
---

🖼️ Preview

Dashboard

Category & Transaction View

Payment Interface

(Replace path-to-your-... with actual image paths or GitHub URLs from your repo’s assets/ folder)
---

🧩 Tech Stack

Frontend:
React.js
Axios for API calls
React Router for navigation
Recharts / Chart.js for data visualization
Tailwind CSS for UI styling

Backend:
Django
Django REST Framework (DRF)
SQLite / PostgreSQL
JWT Authentication

---

⚙️ Features

🔐 Authentication: User registration and JWT-based login system.

💵 Transaction Management: Add, edit, and delete income and expense records.

📊 Data Visualization: Interactive pie and bar charts for income/expense analysis.

🧮 Dashboard Summary: Displays total balance, income, and expenses in real-time.

🗂️ Categorized Tracking: Transactions grouped by type — Bill Payment, Fund Transfer, Recharge, E-commerce, Ticket Booking.

🔍 Search & Filters: Find transactions by category, date, or amount.

📱 Responsive Design: Works smoothly across all screen sizes.

---

🏗️ System Architecture

Frontend → Backend → Database Flow:
React (UI + API calls) → Django REST API → Database (SQLite/PostgreSQL)
Authentication and data exchange are managed via JWT tokens for secure communication.


---

🛠️ Installation & Setup

Clone the repository

git clone https://github.com/student-riya/Web-project
cd finance-expense-tracker

Backend Setup (Django)

cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend Setup (React)

cd frontend
npm install
npm start

Then open:
Frontend: http://localhost:3000
API (Backend): http://127.0.0.1:8000/api/


---

🔗 API Endpoints

Endpoint Method Description

/api/auth/register/ POST Create new user
/api/auth/login/ POST User login
/api/transactions/ GET Fetch all transactions
/api/transactions/ POST Create new transaction
/api/transactions/<id>/ PUT Update existing transaction
/api/transactions/<id>/ DELETE Delete transaction



---

🧭 Future Improvements

AI-based automatic expense categorization

Export reports (CSV, PDF)

Dark mode theme

Multi-user finance sharing and comparison

Notification system for bill reminders

---

👩‍💻 Author

Riya Mondal
riyamondalkolkataindia@gmail.com
🌐 GitHub Profile

[Your Name]
📧 your.email@example.com
🌐 GitHub Profile
