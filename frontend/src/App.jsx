import { useEffect, useState } from "react";

const API = "http://localhost:5001/api/courses";
const fields = [
  ["courseId", "Course ID"],
  ["courseName", "Course Name"],
  ["department", "Department"],
  ["instructor", "Instructor"],
  ["duration", "Duration"],
  ["fee", "Fee (₹)", "number"],
];
const emptyForm = {
  courseId: "", courseName: "", department: "",
  instructor: "", duration: "", fee: "",
};

function App() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  async function load(q = "") {
    try {
      const url = q.trim()
        ? `${API}/search?q=${encodeURIComponent(q.trim())}`
        : API;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCourses(data);
    } catch (err) {
      setMessage(err.message || "Unable to connect to server.");
    }
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await fetch(editing ? `${API}/${editing}` : API, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fee: Number(form.fee) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(editing ? "Course updated!" : "Course added!");
      setForm(emptyForm);
      setEditing(null);
      await load();
    } catch (err) {
      setMessage(err.message || "Unable to save course.");
    }
  }

  function edit(course) {
    setForm(Object.fromEntries(
      fields.map(([key]) => [key, String(course[key])])
    ));
    setEditing(course._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!window.confirm("Delete this course?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Course deleted!");
      if (editing === id) {
        setEditing(null);
        setForm(emptyForm);
      }
      await load(search);
    } catch (err) {
      setMessage(err.message || "Unable to delete course.");
    }
  }

  return (
    <div className="container py-4">
      <header className="app-header rounded-3 p-4 mb-4 text-white">
        <h1>Course Registration System</h1>
        <p className="mb-0">Manage your courses in one place</p>
      </header>

      {message && (
        <div className="alert alert-info">
          {message}
          <button className="btn-close float-end"
            onClick={() => setMessage("")} />
        </div>
      )}

      <section className="card p-4 mb-4">
        <h3>{editing ? "Update Course" : "Add New Course"}</h3>
        <form onSubmit={submit}>
          <div className="row g-3">
            {fields.map(([key, label, type]) => (
              <div className="col-md-6" key={key}>
                <label className="form-label">{label}</label>
                <input
                  className="form-control"
                  type={type || "text"}
                  min={type === "number" ? "0" : undefined}
                  required
                  placeholder={`Enter ${label}`}
                  value={form[key]}
                  onChange={e => setForm({
                    ...form, [key]: e.target.value
                  })}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3">
            {editing ? "Update Course" : "Add Course"}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary mt-3 ms-2"
              onClick={() => { setEditing(null); setForm(emptyForm); }}>
              Cancel
            </button>
          )}
        </form>
      </section>

      <section className="card p-4">
        <h3>Registered Courses ({courses.length})</h3>

        <form className="d-flex gap-2 my-3" onSubmit={e => {
          e.preventDefault();
          load(search);
        }}>
          <input className="form-control" placeholder="Search by ID or name"
            value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn btn-primary">Search</button>
          <button type="button" className="btn btn-outline-secondary"
            onClick={() => { setSearch(""); load(); }}>
            All
          </button>
        </form>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr>
              {fields.map(([, label]) => <th key={label}>{label}</th>)}
              <th>Actions</th>
            </tr></thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  {fields.map(([key]) => (
                    <td key={key}>
                      {key === "fee"
                        ? `₹${Number(course[key]).toLocaleString("en-IN")}`
                        : course[key]}
                    </td>
                  ))}
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => edit(course)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger"
                      onClick={() => remove(course._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!courses.length && (
                <tr><td colSpan="7" className="text-center py-4">
                  No courses found.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-center text-secondary small mt-4">
        Course Registration System · React & MongoDB
      </footer>
    </div>
  );
}

export default App;