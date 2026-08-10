// import { useEffect, useState } from "react";
// import {getAllStudents} from "../services/StudentService";
// // import { Link } from "react-router-dom";
// import type {Student} from "../models/Student";

// function StudentList() {
//     const [students, setStudents] = useState<Student[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchStudents = async () => {
//             try {
//                 const response = await getAllStudents();
//                 setStudents(response.data);
//             } catch {
//                 setError("Failed to load students");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudents();
//     }, []);

//     if (loading) {
//         return <h2>Loading...</h2>;
//     }

//     if (error) {
//         return <h2>{error}</h2>;
//     }

//     return (
//         <div className="container mt-4">
//             <h2>Student List</h2>

//             <table className="table table-bordered table-striped">
//                 <thead>
//                     <tr>
//                         <th>Student ID</th>
//                         <th>Student Name</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {students.map((student) => (
//                         <tr key={student.id}>
//                             <td>{student.id}</td>
//                             <td>{student.name}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default StudentList;

import { useCallback, useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../services/StudentService";
import type { Student } from "../models/Student";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  const fetchStudents = useCallback(async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the student?",
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteStudent(id);
      await fetchStudents();
    } catch {
      alert("Failed to delete Student. ");
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents =
    filteredStudents.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  if (loading) {
    return <h2 className="text-center mt-5"> Loading </h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger mt-5">{error}</h2>;
  }
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student List</h2>
        <Link to="/add-student" className="btn btn-success">
          {" "}
          + Add Student
        </Link>
      </div>
      <div className="row mb-3">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Name, Email or Course..."
            value={searchTerm}
            onChange={(e) => {

              setSearchTerm(e.target.value);

              setCurrentPage(1);

            }}
          />

        </div>

      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Course</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>
                <td>{student.course}</td>
                <td>{student.dateOfJoining}</td>

                <td>
                  <Link
                    to={`/view-student/${student.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    👁 View
                  </Link>

                  <Link
                    to={`/edit-student/${student.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    🖊️ Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id!)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No students match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav className="mt-4">

        <ul className="pagination justify-content-center">

          <li
            className={`page-item ${currentPage === 1
              ? "disabled"
              : ""
              }`}
          >

            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Previous
            </button>

          </li>

          {[...Array(totalPages)].map((_, index) => (

            <li
              key={index}
              className={`page-item ${currentPage === index + 1
                ? "active"
                : ""
                }`}
            >

              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>

            </li>

          ))}

          <li
            className={`page-item ${currentPage === totalPages
              ? "disabled"
              : ""
              }`}
          >

            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>

          </li>

        </ul>

      </nav>
    </div>
  );
}
export default StudentList;
