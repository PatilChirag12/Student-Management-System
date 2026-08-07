import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Student } from "../models/Student";
import { createStudent } from "../services/StudentService";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>({
    name: "",
    email: "",
    mobile: "",
    course: "",
    address: "",
    gender: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const resetForm = () => {
    setStudent({
      name: "",
      email: "",
      mobile: "",
      course: "",
      address: "",
      gender: "",
    });

    setError("");
  };

  const saveStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      student.name.trim() === "" ||
      student.email.trim() === "" ||
      student.mobile.trim() === "" ||
      student.course.trim() === "" ||
      student.address.trim() === "" ||
      student.gender.trim() === ""
    ) {
      setError("All fields are mandatory.");
      return;
    }

    if (!/^\d{10}$/.test(student.mobile)) {
      setError("Mobile number should contain exactly 10 digits.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(student.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      await createStudent(student);

      alert("Student Added Successfully.");

      navigate("/students");
    } catch (err) {
      console.error(err);
      setError("Unable to save student.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h2 className="text-center">
                Add Student
                </h2>
            </div>

            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={saveStudent}>
                {/* Name */}

                <div className="mb-3">
                  <label className="form-label">Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Enter Student Name"
                  />
                </div>

                {/* Email */}

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                  />
                </div>

                {/* Mobile */}

                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>

                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={student.mobile}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                  />
                </div>

                {/* Course */}

                <div className="mb-3">
                  <label className="form-label">Course</label>

                  <select
                    className="form-select"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>

                    <option value="Java">Java</option>

                    <option value="Spring Boot">Spring Boot</option>

                    <option value="React">React</option>

                    <option value="Python">Python</option>
                  </select>
                </div>

                {/* Address */}

                <div className="mb-3">
                  <label className="form-label">Address</label>

                  <textarea
                    className="form-control"
                    rows={3}
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                  ></textarea>
                </div>

                {/* Gender */}

                <div className="mb-3">
                  <label className="form-label d-block">Gender</label>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={student.gender === "Male"}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">Male</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={student.gender === "Female"}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">Female</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={student.gender === "Other"}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">Other</label>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button type="submit" className="btn btn-success me-2">
                    Save Student
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
