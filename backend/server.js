const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Course = require("./models/Course");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Course Registration System Backend is running!");
});

// 1. Add a new course
app.post("/api/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. View all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Search courses by course ID or name
app.get("/api/courses/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Please provide a course ID or course name to search."
      });
    }

    const courses = await Course.find({
      $or: [
        { courseId: { $regex: q.trim(), $options: "i" } },
        { courseName: { $regex: q.trim(), $options: "i" } }
      ]
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Update a course by MongoDB document ID
app.put("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. Delete a course by MongoDB document ID
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });