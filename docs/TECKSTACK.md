# TECH STACK DOCUMENT — Quiz App

## 1. Frontend Technologies

### React.js
Used to build the user interface for the quiz application.

Goal:
Provide a fast, responsive, and component-based UI for all pages including Home, Login, Quiz, and Admin Dashboard.

Tools:
- React (Vite setup)
- React Router DOM
- TanStack Query
- Axios
- CSS or Tailwind CSS

---

### React Router DOM
Used for navigation between pages.

Goal:
Allow users to move between pages without refreshing the browser.

Example Pages:
- Home
- Register
- Login
- Quiz
- Result
- Admin Dashboard

---

### TanStack Query
Used for managing API requests and server data.

Goal:
Handle fetching quiz questions, submitting results, and caching data efficiently.

---

### Axios
Used for sending API requests to the backend.

Goal:
Connect frontend with backend API endpoints.

---

### Tailwind CSS (Optional but Recommended)
Used for styling UI components.

Goal:
Provide fast and responsive styling using utility classes.

Alternative:
- Plain CSS
- CSS Modules

---

## 2. Backend Technologies

### Node.js
Used as the runtime environment.

Goal:
Run JavaScript on the server.

---

### Express.js
Used to build backend APIs.

Goal:
Handle authentication, quiz logic, and database operations.

Responsibilities:
- Handle user authentication
- Serve quiz questions
- Store results
- Manage admin operations

---

### MongoDB
Used as the database.

Goal:
Store users, modules, questions, and results.

Database Collections:
- Users
- Modules
- Questions
- Results


### Mongoose
Used to define database schemas and models.

Goal:
Create structured models for MongoDB collections.

Models:
- User
- Module
- Question
- Result

---

### Clerk (Authentication)
Used for user authentication.

Goal:
Handle secure login and signup.

Features:
- User registration
- Login
- Session handling
- Secure authentication

---

## 3. Development Tools

### Git & GitHub
Used for version control.

Goal:
Track changes and collaborate.


## 5. Project Stack Summary

Frontend:
- React (Vite)
- React Router DOM
- TanStack Query
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Clerk Authentication

Tools:
- GitHub
- Postman
- VS Code


