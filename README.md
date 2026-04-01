# 🎓 QuizzApp — by Matembo Tech

🌐 **Live App**: [https://quizz-app-eight-dun.vercel.app/](https://quizz-app-eight-dun.vercel.app/)

> **Learn smarter. Test sharper. Track your progress.**
> A premium, full-stack quiz platform built for students who deserve more than a generic experience.

---

## 📖 Project Overview

**QuizzApp** is a web-based quiz application that gives students a clean, focused environment to practice subject-based quizzes, track their scores, and improve over time — without the friction of complex platforms or expensive subscriptions.

Built with a carefully considered design system called **"The Luminous Scholar"**, QuizzApp combines editorial aesthetics with high-performance engineering — complete with a custom-built authentication and authorization system — to make learning feel premium, not like a chore.

### Who It's For

| Audience           | Value                                                               |
| ------------------ | ------------------------------------------------------------------- |
| **Students**       | Practice quizzes by module, see instant results, and track progress |
| **Administrators** | Full dashboard to manage modules, questions, and users              |

---

## ✨ Key Features

### 🧑‍🎓 Student Features

- **Secure Registration & Login** — Custom-built authentication with bcrypt password hashing and JWT sessions
- **Module-Based Quiz Selection** — Browse and select quiz modules by year and semester
- **Interactive Quiz Interface** — Answer multiple-choice questions with a smooth, focused UI
- **Automatic Score Calculation** — Instant feedback on completion
- **Results History** — View past quiz scores stored in the database

### 🛠️ Admin Features

- **Admin Dashboard** — Stats overview: total modules, questions, and registered users
- **Module Management** — Create, update, and delete quiz modules (by year & semester)
- **Question Management** — Add, edit, and delete questions per module
- **User Management** — View, update roles, and manage registered users
- **Module-Scoped Question Creation** — Every question is tied to a specific module; no orphan questions allowed
- **Search, Filter & Pagination** — Full table controls on every management page
- **Confirmation Modals** — Safe delete interactions with confirmation dialogs
- **Notification System** — Unread message badge in the dashboard header

---

## 👤 User Roles

### User (Student)

- Register an account
- Log in securely
- Browse available quiz modules
- Take quizzes and submit answers
- View scores and quiz results

### Admin

- Log in to the admin dashboard
- Add, edit, and delete quiz modules
- Add, edit, and delete quiz questions
- View and manage registered users
- Receive and review user messages via the notification panel

---

## 🔄 Application Workflow

```
[Student Flow]
Register → Login → Browse Modules → Select Module
  → Answer Questions → Submit → View Score → (Repeat)

[Admin Flow]
Login → Admin Dashboard → Select Management Page
  → Modules: Add / Edit / Delete
  → Questions: Select Module → Add / Edit / Delete
  → Users: View / Update Role / Delete
```

---

## 🏗️ Architecture Overview

```
Frontend (React/Vite)
        ↕  Axios + TanStack Query
Backend (Express/Node.js)
        ↕  Mongoose
Database (MongoDB Atlas)

Auth: Custom JWT-based authentication & authorization
```

### Frontend Architecture

- Component-based React with Vite for fast builds
- React Router DOM for client-side navigation (no full page refreshes)
- TanStack Query for server state: fetching, caching, and synchronising API data
- Axios with JWT interceptor for all API requests

### Backend Architecture

- Express.js REST API with modular route/controller/model structure
- JWT-based authentication with custom middleware for route protection
- Mongoose models enforce schema structure on MongoDB collections
- Admin access gated by `isAdmin` flag on the User model

### Admin Dashboard Layout

```
┌────────────────────────────────────────────┐
│              HEADER (fixed)                │
├──────────┬─────────────────────────────────┤
│          │                                 │
│ SIDEBAR  │       MAIN CONTENT AREA         │
│ (fixed)  │       (scrollable)              │
│  260px   │                                 │
│          │                                 │
└──────────┴─────────────────────────────────┘
```

---

## 📁 Project Structure

```
Quizz App/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── database.ts          # MongoDB connection
│       │   └── index.ts
│       ├── controllers/
│       │   ├── AuthController.ts    # Register & login logic
│       │   ├── ModuleController.ts  # Module CRUD
│       │   ├── QuestionController.ts# Question CRUD
│       │   ├── ResultController.ts  # Score submission & retrieval
│       │   ├── UserController.ts    # User management
│       │   └── contactController.ts # Contact/message handling
│       ├── middleware/
│       │   ├── auth.ts              # JWT verification
│       │   ├── admin.ts             # Admin-only route guard
│       │   ├── authorization.ts     # Role-based access control
│       │   └── errorHandler.ts      # Global error handler
│       ├── models/
│       │   ├── User.ts
│       │   ├── Module.ts
│       │   ├── Question.ts
│       │   ├── Result.ts
│       │   └── contact.ts
│       ├── routes/
│       │   ├── auth.routes.ts
│       │   ├── module.routes.ts
│       │   ├── question.routes.ts
│       │   ├── result.routes.ts
│       │   ├── user.routes.ts
│       │   └── contact.routes.ts
│       ├── app.ts                   # Express app setup
│       └── server.ts                # Server entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Header.tsx
        │   ├── Hero.tsx
        │   ├── Categories.tsx
        │   ├── FeaturedQuizzes.tsx
        │   ├── ScoreHistory.tsx
        │   ├── Modal.tsx
        │   ├── Sidebar.tsx
        │   ├── Footer.tsx
        │   └── newsletter.tsx
        ├── pages/
        │   ├── Home.tsx
        │   ├── Register.tsx
        │   ├── Login.tsx
        │   ├── Modules.tsx
        │   ├── Quiz.tsx
        │   ├── QuizResult.tsx
        │   └── Contact.tsx
        ├── context/
        │   └── AppContext.tsx        # Global auth & app state
        ├── services/
        │   ├── api.ts               # Axios instance & interceptors
        │   └── quizService.ts       # Quiz-specific API calls
        ├── App.tsx
        └── main.tsx
```

---

## 🛠️ Technology Stack

### Frontend

| Technology       | Purpose                          |
| ---------------- | -------------------------------- |
| React (Vite)     | UI framework, fast build tooling |
| React Router DOM | Client-side routing              |
| TanStack Query   | Server state management          |
| Axios            | HTTP requests to backend         |
| Tailwind CSS     | Utility-first styling            |

### Backend

| Technology      | Purpose                                                  |
| --------------- | -------------------------------------------------------- |
| Node.js         | JavaScript server runtime                                |
| Express.js      | REST API framework                                       |
| MongoDB         | NoSQL document database                                  |
| Mongoose        | Schema definitions and ODM                               |
| Custom JWT Auth | Authentication, authorization, password hashing (bcrypt) |

### Development Tools

| Tool         | Purpose         |
| ------------ | --------------- |
| Git & GitHub | Version control |
| Postman      | API testing     |
| VS Code      | Code editor     |

---

## ⚙️ Installation Guide

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone https://github.com/matembo-tech/quizzapp.git
cd quizzapp
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create `.env` in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create `.env` in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Run Development Servers

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

### 6. Build for Production

```bash
cd frontend
npm run build
```

---

## 🔑 Environment Variables

| Variable            | Location | Purpose                                     |
| ------------------- | -------- | ------------------------------------------- |
| `PORT`              | backend  | Port the Express server listens on          |
| `MONGO_URI`         | backend  | MongoDB Atlas connection string             |
| `JWT_SECRET`        | backend  | Secret for signing and verifying JWT tokens |
| `VITE_API_BASE_URL` | frontend | Base URL for all Axios API requests         |

---

## 📡 API Endpoints

### User Routes

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| `POST` | `/api/register`            | Register a new user                 |
| `POST` | `/api/login`               | User login                          |
| `GET`  | `/api/modules`             | Fetch all available quiz modules    |
| `GET`  | `/api/questions?moduleId=` | Fetch questions filtered by module  |
| `POST` | `/api/submit-quiz`         | Submit answers and calculate score  |
| `GET`  | `/api/results`             | Fetch quiz results for current user |

### Admin Routes

| Method   | Endpoint                    | Description                      |
| -------- | --------------------------- | -------------------------------- |
| `POST`   | `/api/modules/add`          | Create a new module              |
| `DELETE` | `/api/modules/delete/:id`   | Delete a module                  |
| `POST`   | `/api/questions/add`        | Add a question to a module       |
| `POST`   | `/api/questions/update/:id` | Update an existing question      |
| `DELETE` | `/api/questions/delete/:id` | Delete a question                |
| `GET`    | `/api/questions`            | Fetch all questions (admin view) |

---

## 🧪 Testing

- **API Testing**: Postman — all endpoints tested manually during development
- **Frontend Testing**: Manual testing across pages and user flows
- **Auth Testing**: Registration, login, JWT token validation, and role-based access tested via Postman

---

## 🚀 Deployment

| Service           | Usage                                |
| ----------------- | ------------------------------------ |
| **Vercel**        | Frontend deployment (React/Vite)     |
| **Render**        | Backend deployment (Express/Node.js) |
| **MongoDB Atlas** | Cloud-hosted database                |

---

## 🖼️ Screenshots

| Page                 | Preview                                               |
| -------------------- | ----------------------------------------------------- |
| Home Page            | ![Home Page](./assets/homepage.png)                   |
| Quiz Interface       | ![Quiz Interface](./assets/quiz.png)                  |
| Results Page         | ![Results Page](./assets/results.png)                 |
| Admin Dashboard      | ![Admin Dashboard](./assets/admin-dashboard.png)      |
| Modules Management   | ![Modules Management](./assets/admin-modules.png)     |
| Questions Management | ![Questions Management](./assets/admin-questions.png) |

> 📸 Screenshots will be added as development progresses.

---

## 📌 Project Status

> 🟡 **In Active Development** — Core user flows and admin dashboard are complete. Deployment and polish in progress.

---

## 🔮 Future Improvements

- [ ] **Leaderboard** — Rank students by score across modules
- [ ] **Timed Quizzes** — Add per-question countdown timers
- [ ] **Analytics Dashboard** — Charts showing questions per module and user growth trends
- [ ] **Bulk Question Upload** — CSV/file-based mass question import
- [ ] **Activity Logs** — Track admin actions for accountability
- [ ] **Export Results** — Download quiz results as CSV
- [ ] **Real-Time Messaging** — Admin can reply to user messages in-app
- [ ] **Mobile Application** — Native iOS and Android apps (planned)
- [ ] **Multiplayer Quizzes** — Compete with other students in real time (planned)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style and write clear commit messages.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Credits

- **Built by** — [Matembo Tech](https://github.com/matembo-tech)
- **Design System** — _The Luminous Scholar_ (custom, original)
- **Authentication** — Custom JWT implementation with bcrypt
- **UI Framework** — [React](https://reactjs.org) + [Tailwind CSS](https://tailwindcss.com)
- **Server State** — [TanStack Query](https://tanstack.com/query)
- **Database** — [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com)

---

<div align="center">

**QuizzApp** — Built with purpose. Designed with intention. Shipped with pride.

_Matembo Tech © 2025_

</div>
