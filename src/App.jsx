import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./App.css";

/* =========================
   HOME PAGE
========================= */

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <div className="home-card">

        <div className="badge">
          STUDENT PORTAL
        </div>

        <h1>
          Welcome to Mini Student Portal
        </h1>

        <p>
          Manage student registration and view student
          information in one simple and organized portal.
        </p>

        <div className="home-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            Add Student
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/students")}
          >
            View Students
          </button>
        </div>

      </div>
    </div>
  );
}

/* =========================
   REGISTER PAGE
========================= */

function Register({ addStudent }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    course: "",
    yearLevel: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required.";
    } else if (!/^\d{4}-\d{4}$/.test(formData.studentId)) {
      newErrors.studentId = "Student ID must be ####-####.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course.";
    }

    if (!formData.yearLevel) {
      newErrors.yearLevel = "Please select your year level.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addStudent(formData);

    setFormData({
      fullName: "",
      studentId: "",
      email: "",
      course: "",
      yearLevel: "",
    });

    alert("Student successfully registered!");

    navigate("/students");
  };

  return (
    <div className="page register-page">

      <div className="form-card">

        <div className="page-label">
          STUDENT REGISTRATION
        </div>

        <h2>
          Student Registration
        </h2>

        <p className="form-subtitle">
          Fill out the form below to register a new student.
        </p>

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <p className="error">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* STUDENT ID */}

          <div className="form-group">
            <label>
              Student ID
            </label>

            <input
              type="text"
              name="studentId"
              placeholder="2024-1234"
              maxLength="9"
              value={formData.studentId}
              onChange={handleChange}
            />

            <p className="input-hint">
              Format: ####-####
            </p>

            {errors.studentId && (
              <p className="error">
                {errors.studentId}
              </p>
            )}
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="error">
                {errors.email}
              </p>
            )}
          </div>

          {/* COURSE */}

          <div className="form-group">
            <label>
              Course
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">
                Select your course
              </option>

              <option value="BS Information Technology">
                BS Information Technology
              </option>

              <option value="BS Computer Science">
                BS Computer Science
              </option>

              <option value="BS Information Systems">
                BS Information Systems
              </option>

              <option value="BS Computer Engineering">
                BS Computer Engineering
              </option>
            </select>

            {errors.course && (
              <p className="error">
                {errors.course}
              </p>
            )}
          </div>

          {/* YEAR LEVEL */}

          <div className="form-group">
            <label>
              Year Level
            </label>

            <select
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
            >
              <option value="">
                Select year level
              </option>

              <option value="1st Year">
                1st Year
              </option>

              <option value="2nd Year">
                2nd Year
              </option>

              <option value="3rd Year">
                3rd Year
              </option>

              <option value="4th Year">
                4th Year
              </option>
            </select>

            {errors.yearLevel && (
              <p className="error">
                {errors.yearLevel}
              </p>
            )}
          </div>

          {/* BUTTONS */}

          <div className="form-actions">

            <button
              type="submit"
              className="btn btn-primary"
            >
              Register Student
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

/* =========================
   STUDENTS PAGE
========================= */

function Students({ students, deleteStudent }) {
  const navigate = useNavigate();

  return (
    <div className="page students-page">

      <div className="students-card">

        <div className="students-header">

          <div>
            <div className="page-label">
              STUDENT RECORDS
            </div>

            <h2>
              Registered Students
            </h2>

            <p className="students-subtitle">
              View and manage registered student information.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/register")}
          >
            + Add Student
          </button>

        </div>

        {students.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ♙
            </div>

            <h3>
              No Students Yet
            </h3>

            <p>
              There are no registered students.
              Click "Add Student" to register one.
            </p>

          </div>

        ) : (

          <div className="student-list">

            {students.map((student) => (

              <div
                className="student-item"
                key={student.studentId}
              >

                <div className="student-avatar">
                  {student.fullName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="student-info">

                  <h3>
                    {student.fullName}
                  </h3>

                  <p>
                    ID: {student.studentId}
                  </p>

                  <p>
                    {student.course} • {student.yearLevel}
                  </p>

                  <p>
                    {student.email}
                  </p>

                </div>

                <div className="student-actions">

                  <button
                    className="btn btn-view"
                    onClick={() =>
                      navigate(
                        `/students/${student.studentId}`
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => {

                      if (
                        window.confirm(
                          `Delete ${student.fullName}?`
                        )
                      ) {
                        deleteStudent(student.studentId);
                      }

                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

/* =========================
   STUDENT DETAILS
========================= */

function StudentDetails({ students }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find(
    (student) =>
      student.studentId === id
  );

  if (!student) {

    return (
      <div className="page">

        <div className="students-card">

          <div className="empty-state">

            <div className="empty-icon">
              ?
            </div>

            <h3>
              Student Not Found
            </h3>

            <p>
              The student information you are
              looking for does not exist.
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/students")
              }
            >
              Back to Students
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="page student-details-page">

      <div className="form-card">

        <div className="page-label">
          STUDENT INFORMATION
        </div>

        <h2>
          Student Details
        </h2>

        <p className="form-subtitle">
          Complete information of the selected student.
        </p>

        <div className="details-list">

          <div className="detail-item">
            <span>Full Name</span>
            <strong>{student.fullName}</strong>
          </div>

          <div className="detail-item">
            <span>Student ID</span>
            <strong>{student.studentId}</strong>
          </div>

          <div className="detail-item">
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div className="detail-item">
            <span>Course</span>
            <strong>{student.course}</strong>
          </div>

          <div className="detail-item">
            <span>Year Level</span>
            <strong>{student.yearLevel}</strong>
          </div>

        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/students")
          }
        >
          Back to Students
        </button>

      </div>

    </div>
  );
}

/* =========================
   NAVBAR
========================= */

function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-container">

        <div className="logo">
          <div className="logo-mark">
            
          </div>

          <span>
            Mini Student Portal
          </span>
        </div>

        <div className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Students
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

/* =========================
   MAIN APP
========================= */

function App() {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    setStudents((currentStudents) => [
      ...currentStudents,
      student,
    ]);
  };

  const deleteStudent = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) =>
          student.studentId !== studentId
      )
    );
  };

  return (
    <BrowserRouter>

      <div className="app">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/register"
            element={
              <Register
                addStudent={addStudent}
              />
            }
          />

          <Route
            path="/students"
            element={
              <Students
                students={students}
                deleteStudent={deleteStudent}
              />
            }
          />

          <Route
            path="/students/:id"
            element={
              <StudentDetails
                students={students}
              />
            }
          />

          <Route
            path="*"
            element={
              <div className="page">

                <div className="students-card">

                  <div className="empty-state">

                    <div className="empty-icon">
                      404
                    </div>

                    <h3>
                      Page Not Found
                    </h3>

                    <p>
                      The page you are looking
                      for does not exist.
                    </p>

                  </div>

                </div>

              </div>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;