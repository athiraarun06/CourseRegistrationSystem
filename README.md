# 🎓 Course Registration System

A simple and user-friendly web application to manage course information efficiently. This project allows users to add, view, search, update, and delete course records through an interactive interface.

---

## ✨ Features

- ➕ **Add Courses** — Register new courses with complete details.
- 📋 **View Courses** — Display all registered courses in a table.
- 🔍 **Search Courses** — Find courses by course ID or course name.
- ✏️ **Update Courses** — Edit existing course information.
- 🗑️ **Delete Courses** — Remove unwanted course records.
- 💾 **Database Integration** — Store course details in MongoDB.
- 🎨 **Responsive UI** — Clean interface built with Bootstrap and CSS.
- 👥 **Team Section** — Displays project team members.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| ⚛️ React | Builds the frontend user interface |
| 🟢 Node.js | Runs the backend JavaScript environment |
| 🚀 Express.js | Handles backend routes and API requests |
| 🍃 MongoDB | Stores course information |
| 🔗 Mongoose | Connects the backend with MongoDB |
| 🎨 Bootstrap | Provides responsive UI components |
| 💅 CSS | Customizes the website's appearance |
| 🧰 VS Code | Development environment |

---

## 📂 Project Structure

```text
CourseRegistrationSystem/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── Course.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🗃️ Database Structure

**Database:** `courseRegistrationDB`  
**Collection:** `courses`

Each course contains the following information:

| Field | Description |
|---|---|
| `courseId` | Unique course identification |
| `courseName` | Name of the course |
| `department` | Department offering the course |
| `instructor` | Name of the instructor |
| `duration` | Duration of the course |
| `fee` | Course fee |

---

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (optional, for viewing database records)

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd CourseRegistrationSystem
```

### 2. Start MongoDB

If you installed MongoDB Community Server using Homebrew on macOS:

```bash
brew services start mongodb-community@8.0
```

### 3. Configure the Backend

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure your MongoDB connection:

```env
MONGO_URI=mongodb://127.0.0.1:27017/courseRegistrationDB
```

**Important:** Never upload your `.env` file or database credentials to GitHub.

Start the backend:

```bash
npm start
```

The backend runs on:

`http://localhost:5001`

### 4. Start the Frontend

Open a **second terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal, usually:

`http://localhost:5173`

🎉 Your Course Registration System is ready to use!

---

## 🔄 CRUD Operations

This project implements the four fundamental CRUD operations:

| Operation | HTTP Method | Description |
|---|---|---|
| Create | POST | Add a new course |
| Read | GET | Retrieve registered courses |
| Update | PUT | Modify course information |
| Delete | DELETE | Remove a course |

### API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/courses` | Add a course |
| `GET` | `/api/courses` | Get all courses |
| `GET` | `/api/courses/search?q=...` | Search courses |
| `PUT` | `/api/courses/:id` | Update a course |
| `DELETE` | `/api/courses/:id` | Delete a course |

---

## 👩‍💻 Team Members

- **Athira Arun**
- **Pooja Shree**

---

## 🎯 Project Objective

The objective of this project is to simplify course management by providing an organized platform for maintaining course records. It demonstrates the integration of frontend development, backend APIs, and database management in a full-stack web application.

---

## 🚀 Future Improvements

- 🔐 User authentication and login
- 📊 Course statistics and dashboard
- 📥 Export course records to CSV or PDF
- 🎓 Student enrollment management

---

## 💙 Acknowledgement

This project was developed as part of our learning experience in full-stack web development, helping us understand React, Node.js, Express.js, and MongoDB.

---

<p align="center">
  <b>🎓 Course Registration System</b><br>
  Built with React, Node.js, Express.js & MongoDB
</p>
