# Express Todo App with Typescript

A minimal Express API written in TypeScript that demonstrates:

- 🔁 Route splitting
- 🔐 JWT-based authentication middleware
- ✅ Input validation with Zod
- 💾 In-memory database (using Maps)
- 📝 Per-user Todo list

## 📁 Project Structure

```
src/
├── app.ts               # Main Express setup
├── index.ts             # App entry point
├── config.ts            # App-wide config (JWT secret)
├── models/
│   └── db.ts            # In-memory users and todos
├── middleware/
│   ├── authMiddleware.ts
│   └── validate.ts
├── routes/
│   ├── auth.ts          # /auth/register, /auth/login
│   ├── users.ts         # /users/me
│   └── todos.ts         # /todos [GET, POST]
├── types/
│   └── express/index.d.ts # Type augmentation for req.user
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Server runs on: `http://localhost:3000`

---

## 🧪 API Endpoints

### 🧍‍♂️ Register a User

```bash
POST /auth/register
Content-Type: application/json

{
  "username": "john",
  "password": "secret123"
}
```

---

### 🔑 Login

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "secret123"
}
```

---

### 🙋‍♂️ Get Current User

```bash
GET /users/me
Authorization: Bearer <token>
```

---

### 📝 Create Todo

```bash
POST /todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries"
}
```

---

### 📋 Get Todos

```bash
GET /todos
Authorization: Bearer <token>
```

---

## 🛡 Auth Middleware

The app uses **JWT tokens**, signed and verified using `jsonwebtoken`.

Tokens expire in 1 hour and are stored in memory only during runtime.
