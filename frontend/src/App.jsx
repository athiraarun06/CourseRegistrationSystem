```jsx
import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    department: "",
    instructor: "",
    duration: "",
    fee: "",
  });

  const [message, setMessage] = useState("");

  // Load courses from the backend
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/courses");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load courses.");
      }

      setCourses(data);
    } catch (error) {
      setMessage("Could not connect to the backend. Check that it is running.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Update form fields
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Save a course to MongoDB
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          fee: Number(form.fee),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add course.");
      }

      setMessage("Course added successfully!");
      setForm({
        courseId: "",
        courseName: "",
        department: "",
        instructor: "",
        duration: "",
        fee: "",
      });

      await fetchCourses();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Delete a course from MongoDB
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete course.");
      }

      setMessage("Course deleted successfully!");
      await fetchCourses();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-2">Course Registration System</h1>
      <p className="text-center text-muted mb-4">
        Manage courses using React, Node.js, Express, and MongoDB
      </p>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add a New Course</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {[
                ["courseId", "Course ID", "text"],
                ["courseName", "Course Name", "text"],
                ["department", "Department", "text"],
                ["instructor", "Instructor", "text"],
                ["duration", "Duration", "text"],
                ["fee", "Fee (₹)", "number"],
              ].map(([name, label, type]) => (
                <div className="col-md-6 mb-3" key={name}>
                  <label htmlFor={name} className="form-label">
                    {label}
                  </label>

                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="form-control"
                    value={form[name]}
                    onChange={handleChange}
                    required
                    min={type === "number" ? "0" : undefined}
                    step={type === "number" ? "0.01" : undefined}
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">
              Add Course
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Registered Courses</h4>
        </div>

        <div className="card-body">
          {courses.length === 0 ? (
            <p className="text-muted mb-0">No courses found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Department</th>
                    <th>Instructor</th>
                    <th>Duration</th>
                    <th>Fee (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.courseId}</td>
                      <td>{course.courseName}</td>
                      <td>{course.department}</td>
                      <td>{course.instructor}</td>
                      <td>{course.duration}</td>
                      <td>{course.fee}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```