# 🚀 Cognifyz Full Stack Internship Management Portal

A modern, production-ready **Full Stack Web Application** developed as part of the **Cognifyz Technologies Full Stack Development Internship Program**.

This project demonstrates end-to-end web application development by combining responsive user interfaces, secure authentication, database integration, RESTful APIs, external API consumption, caching mechanisms, and background task processing into a single scalable platform.

---

## 📌 Project Overview

The **Full Stack Internship Management Portal** is designed to simulate a real-world internship management system where users can register, authenticate, manage profiles, interact with dashboards, and perform CRUD operations through a secure and responsive application architecture.

The application follows modern development practices and implements all internship requirements from Beginner to Expert level.

---

## ✨ Key Features

### 🎨 Modern User Interface

* Futuristic glassmorphism design
* Responsive layout for Desktop, Tablet, and Mobile
* Smooth scrolling animations
* Floating background elements
* Interactive cards and hover effects
* Scroll reveal animations
* Gradient buttons and modern typography
* Dark theme user experience

### 🔐 Authentication & Security

* User Registration
* User Login & Logout
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Authorization Middleware
* Forgot Password functionality

### 📊 Dashboard Management

* Dynamic Dashboard Interface
* User Search
* Sorting
* Pagination
* Real-time updates
* Dashboard statistics

### 🌐 RESTful API Integration

Complete CRUD functionality:

* Create Users
* Read Users
* Update Users
* Delete Users

### 🗄️ Database Integration

* MongoDB integration
* Automatic in-memory fallback support
* Collections for Users, Applications, and Contacts

### ⚡ Performance Optimization

* Redis caching
* Cache middleware
* Background cron jobs
* Optimized API responses

### 🔗 External API Integration

GitHub API integration with:

* Profile information
* Followers
* Following
* Public repositories
* Repository statistics

### 🛡️ Error Handling

* Custom 404 page
* Custom 500 page
* Validation middleware
* API rate limiting

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Bootstrap 5
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### Additional Tools

* Axios
* Redis
* Node Cron
* Morgan
* Body Parser
* Express Rate Limit
* Helmet
* Compression
* Cookie Parser
* Dotenv

---

## 📂 Project Structure

```text
Cognifyz_Internship_Project

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── cache/
├── jobs/
├── utils/
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/cognifyz-full-stack-internship-portal.git

cd cognifyz-full-stack-internship-portal
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017/cognifyz

JWT_SECRET=your_secret_key

REDIS_URL=redis://127.0.0.1:6379

NODE_ENV=development
```

---

### 4️⃣ Start Application

```bash
npm start
```

or

```bash
node server.js
```

---

### 5️⃣ Open Application

```text
http://localhost:3000
```

---

## ✅ Internship Task Completion

| Task   | Description                         | Status |
| ------ | ----------------------------------- | ------ |
| Task 1 | HTML Structure & Server Interaction | ✅      |
| Task 2 | Validation & User Interaction       | ✅      |
| Task 3 | Responsive Design & Animations      | ✅      |
| Task 4 | Dynamic DOM Manipulation            | ✅      |
| Task 5 | REST API Integration                | ✅      |
| Task 6 | Database & Authentication           | ✅      |
| Task 7 | External API Integration            | ✅      |
| Task 8 | Advanced Server Functionality       | ✅      |

---

## 🧪 Implemented Functionalities

✔️ Responsive User Interface

✔️ Express.js Backend Server

✔️ EJS Server-Side Rendering

✔️ MongoDB Integration

✔️ JWT Authentication

✔️ Password Encryption

✔️ CRUD Operations

✔️ GitHub API Integration

✔️ Redis Caching

✔️ Cron Background Jobs

✔️ Protected Routes

✔️ Error Handling Pages

✔️ Search, Sorting & Pagination

✔️ Dashboard Analytics

✔️ Modern Animations

---

## 👨‍💻 Developer

**Shubham Besetty**

Developed as part of the **Cognifyz Technologies Full Stack Development Internship Program**.

---

## 📄 License

This project is intended for educational, portfolio, and internship demonstration purposes.
