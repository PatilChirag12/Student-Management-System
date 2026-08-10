// // import { useEffect, useState } from "react";
// // import {getAllStudents} from "../services/StudentService";
// // // import { Link } from "react-router-dom";
// // import type {Student} from "../models/Student";

// // function StudentList() {
// //     const [students, setStudents] = useState<Student[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState("");

// //     useEffect(() => {
// //         const fetchStudents = async () => {
// //             try {
// //                 const response = await getAllStudents();
// //                 setStudents(response.data);
// //             } catch {
// //                 setError("Failed to load students");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchStudents();
// //     }, []);

// //     if (loading) {
// //         return <h2>Loading...</h2>;
// //     }

// //     if (error) {
// //         return <h2>{error}</h2>;
// //     }

// //     return (
// //         <div className="container mt-4">
// //             <h2>Student List</h2>

// //             <table className="table table-bordered table-striped">
// //                 <thead>
// //                     <tr>
// //                         <th>Student ID</th>
// //                         <th>Student Name</th>
// //                     </tr>
// //                 </thead>

// //                 <tbody>
// //                     {students.map((student) => (
// //                         <tr key={student.id}>
// //                             <td>{student.id}</td>
// //                             <td>{student.name}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // }

// // export default StudentList;

// import { useCallback, useEffect, useState } from "react";
// import { getAllStudents, deleteStudent } from "../services/StudentService";
// import type { Student } from "../models/Student";
// import { Link } from "react-router-dom";

// function StudentList() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const studentsPerPage = 10;

//   const fetchStudents = useCallback(async () => {
//     try {
//       const response = await getAllStudents();
//       setStudents(response.data);
//     } catch {
//       setError("Failed to load students");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchStudents();
//   }, [fetchStudents]);

//   const handleDelete = async (id: number) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete the student?",
//     );
//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       await deleteStudent(id);
//       await fetchStudents();
//     } catch {
//       alert("Failed to delete Student. ");
//     }
//   };

//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.course.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastStudent = currentPage * studentsPerPage;

//   const indexOfFirstStudent =
//     indexOfLastStudent - studentsPerPage;

//   const currentStudents =
//     filteredStudents.slice(
//       indexOfFirstStudent,
//       indexOfLastStudent
//     );

//   const totalPages = Math.ceil(
//     filteredStudents.length / studentsPerPage
//   );

//   if (loading) {
//     return <h2 className="text-center mt-5"> Loading </h2>;
//   }

//   if (error) {
//     return <h2 className="text-center text-danger mt-5">{error}</h2>;
//   }
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Student List</h2>
//         <Link to="/add-student" className="btn btn-success">
//           {" "}
//           + Add Student
//         </Link>
//       </div>
//       <div className="row mb-3">

//         <div className="col-md-6">

//           <input
//             type="text"
//             className="form-control"
//             placeholder="🔍 Search by Name, Email or Course..."
//             value={searchTerm}
//             onChange={(e) => {

//               setSearchTerm(e.target.value);

//               setCurrentPage(1);

//             }}
//           />

//         </div>

//       </div>
//       <div className="table-responsive">
//       <table className="table table-bordered table-hover table-striped align-middle">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>Course</th>
//             <th>Date of Joining</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentStudents.length > 0 ? (
//             currentStudents.map((student) => (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>
//                 <td>{student.mobile}</td>
//                 <td>{student.course}</td>
//                 <td>{student.dateOfJoining}</td>

//                 <td>
//                   <Link
//                     to={`/view-student/${student.id}`}
//                     className="btn btn-info btn-sm me-2"
//                   >
//                     👁 View
//                   </Link>

//                   <Link
//                     to={`/edit-student/${student.id}`}
//                     className="btn btn-warning btn-sm me-2"
//                   >
//                     🖊️ Edit
//                   </Link>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(student.id!)}
//                   >
//                     🗑️ Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={7} className="text-center">
//                 No students match your search.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <nav className="mt-4">

//         <ul className="pagination justify-content-center">

//           <li
//             className={`page-item ${currentPage === 1
//               ? "disabled"
//               : ""
//               }`}
//           >

//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage(currentPage - 1)
//               }
//             >
//               Previous
//             </button>

//           </li>

//           {[...Array(totalPages)].map((_, index) => (

//             <li
//               key={index}
//               className={`page-item ${currentPage === index + 1
//                 ? "active"
//                 : ""
//                 }`}
//             >

//               <button
//                 className="page-link"
//                 onClick={() =>
//                   setCurrentPage(index + 1)
//                 }
//               >
//                 {index + 1}
//               </button>

//             </li>

//           ))}

//           <li
//             className={`page-item ${currentPage === totalPages
//               ? "disabled"
//               : ""
//               }`}
//           >

//             <button
//               className="page-link"
//               onClick={() =>
//                 setCurrentPage(currentPage + 1)
//               }
//             >
//               Next
//             </button>

//           </li>

//         </ul>

//       </nav>
//       </div>
//     </div>
//   );
// }
// export default StudentList;

import {
    useCallback,
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import type { Student } from "../models/Student";

import {
    getAllStudents,
    deleteStudent,
    searchStudentsByName,
    getStudentsByCourse,
    getStudentsSortedByName,
    getStudentsSortedByDate,
    downloadAllStudentsExcel,
    downloadStudentsByNameExcel,
    downloadStudentsByCourseExcel,
    downloadStudentsSortedByNameExcel,
    downloadStudentsSortedByDateExcel
} from "../services/StudentService";

import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmationDialog from "../components/ConfirmationDialog";
import AlertMessage from "../components/AlertMessage";
import LoadingSpinner from "../components/LoadingSpinner";

function StudentList() {

    const [students, setStudents] =
        useState<Student[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [searchTerm, setSearchTerm] =
        useState("");

    const [searchType, setSearchType] =
        useState<"all" | "name" | "course">("all");

    const [sortType, setSortType] =
        useState<"none" | "name" | "date">("none");

    const [currentPage, setCurrentPage] =
        useState(1);

    const studentsPerPage = 10;

    const [showDeleteDialog, setShowDeleteDialog] =
        useState(false);

    const [studentToDelete, setStudentToDelete] =
        useState<Student | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    const [exporting, setExporting] =
        useState(false);


    /*
     * Get all students
     */
    const fetchStudents = useCallback(
        async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getAllStudents();

                setStudents(response.data);

            } catch (err) {

                console.error(err);

                setError(
                    "Failed to load students."
                );

            } finally {

                setLoading(false);

            }

        },
        []
    );


    useEffect(() => {

        fetchStudents();

    }, [fetchStudents]);


    /*
     * Search / filter
     */
    const handleSearch = async (
        value: string
    ) => {

        setSearchTerm(value);
        setCurrentPage(1);
        setError("");

        if (!value.trim()) {

            setSearchType("all");
            setSortType("none");

            await fetchStudents();

            return;
        }

        try {

            setLoading(true);

            let response;

            if (searchType === "name") {

                response =
                    await searchStudentsByName(
                        value
                    );

            } else if (
                searchType === "course"
            ) {

                response =
                    await getStudentsByCourse(
                        value
                    );

            } else {

                /*
                 * Backend only has search by name
                 * and course.
                 *
                 * For "all", we'll first try
                 * name search and then filter
                 * email/mobile/course locally.
                 */
                response =
                    await searchStudentsByName(
                        value
                    );

                const nameResults =
                    response.data;

                const lowerValue =
                    value.toLowerCase();

                const localResults =
                    nameResults.filter(
                        (student) =>
                            student.name
                                .toLowerCase()
                                .includes(lowerValue) ||
                            student.email
                                .toLowerCase()
                                .includes(lowerValue) ||
                            student.mobile
                                .includes(value) ||
                            student.course
                                .toLowerCase()
                                .includes(lowerValue)
                    );

                setStudents(localResults);

                return;
            }

            setStudents(response.data);

        } catch (err: any) {

            console.error(err);

            if (
                err.response?.status === 404
            ) {

                setStudents([]);

            } else {

                setError(
                    "Unable to search students."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    /*
     * Sorting
     */
    const handleSort = async (
        type: "none" | "name" | "date"
    ) => {

        setSortType(type);
        setCurrentPage(1);
        setError("");

        if (type === "none") {

            await fetchStudents();

            return;
        }

        try {

            setLoading(true);

            let response;

            if (type === "name") {

                response =
                    await getStudentsSortedByName();

            } else {

                response =
                    await getStudentsSortedByDate();

            }

            setStudents(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to sort students."
            );

        } finally {

            setLoading(false);

        }
    };


    /*
     * Open delete dialog
     */
    const openDeleteDialog = (
        student: Student
    ) => {

        setStudentToDelete(student);
        setShowDeleteDialog(true);

    };


    /*
     * Cancel delete
     */
    const closeDeleteDialog = () => {

        if (deleting) {
            return;
        }

        setShowDeleteDialog(false);
        setStudentToDelete(null);

    };


    /*
     * Confirm delete
     */
    const confirmDelete = async () => {

        if (
            !studentToDelete?.id
        ) {
            return;
        }

        try {

            setDeleting(true);
            setError("");

            await deleteStudent(
                studentToDelete.id
            );

            setSuccess(
                `Student "${studentToDelete.name}" deleted successfully.`
            );

            setShowDeleteDialog(false);
            setStudentToDelete(null);

            await fetchStudents();

        } catch (err: any) {

            console.error(err);

            if (
                err.response?.status === 404
            ) {

                setError(
                    "Student not found."
                );

            } else {

                setError(
                    "Failed to delete student."
                );

            }

        } finally {

            setDeleting(false);

        }
    };


    /*
     * Pagination
     */
    const totalPages = Math.ceil(
        students.length /
        studentsPerPage
    );

    const indexOfLastStudent =
        currentPage *
        studentsPerPage;

    const indexOfFirstStudent =
        indexOfLastStudent -
        studentsPerPage;

    const currentStudents =
        students.slice(
            indexOfFirstStudent,
            indexOfLastStudent
        );


    /*
     * Download helper
     */
    const downloadFile = (
        data: Blob,
        fileName: string
    ) => {

        const url =
            window.URL.createObjectURL(
                data
            );

        const link =
            document.createElement("a");

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(
            url
        );
    };


    /*
     * Excel export
     */
    const handleExcelExport = async (
        type:
            | "all"
            | "name"
            | "course"
            | "sortName"
            | "sortDate"
    ) => {

        try {

            setExporting(true);
            setError("");

            let response;
            let fileName;

            if (type === "all") {

                response =
                    await downloadAllStudentsExcel();

                fileName =
                    "students.xlsx";

            } else if (
                type === "name"
            ) {

                if (!searchTerm.trim()) {

                    setError(
                        "Enter a name before exporting by name."
                    );

                    return;
                }

                response =
                    await downloadStudentsByNameExcel(
                        searchTerm
                    );

                fileName =
                    `students_with_name_${searchTerm}.xlsx`;

            } else if (
                type === "course"
            ) {

                if (!searchTerm.trim()) {

                    setError(
                        "Enter a course before exporting by course."
                    );

                    return;
                }

                response =
                    await downloadStudentsByCourseExcel(
                        searchTerm
                    );

                fileName =
                    `students_with_course_${searchTerm}.xlsx`;

            } else if (
                type === "sortName"
            ) {

                response =
                    await downloadStudentsSortedByNameExcel();

                fileName =
                    "students_sorted_by_name.xlsx";

            } else {

                response =
                    await downloadStudentsSortedByDateExcel();

                fileName =
                    "students_sorted_by_doj.xlsx";

            }

            downloadFile(
                response.data,
                fileName
            );

            setSuccess(
                "Excel file downloaded successfully."
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to export Excel file."
            );

        } finally {

            setExporting(false);

        }
    };


    /*
     * Loading
     */
    if (loading) {

        return (
            <LoadingSpinner />
        );

    }


    return (

        <div className="container-fluid py-4 px-3 px-md-4">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <div>

                    <h2 className="mb-1">
                        Student List
                    </h2>

                    <p className="text-muted mb-0">
                        Manage all student records
                    </p>

                </div>

                <Link
                    to="/add-student"
                    className="btn btn-success"
                >
                    + Add Student
                </Link>

            </div>


            {/* Alerts */}
            {error && (
                <AlertMessage
                    type="danger"
                    message={error}
                    onClose={() =>
                        setError("")
                    }
                />
            )}

            {success && (
                <AlertMessage
                    type="success"
                    message={success}
                    onClose={() =>
                        setSuccess("")
                    }
                />
            )}


            {/* Search and Sort */}
            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3">

                        {/* Search type */}
                        <div className="col-12 col-md-3">

                            <label className="form-label">
                                Search By
                            </label>

                            <select
                                className="form-select"
                                value={searchType}
                                onChange={(e) => {

                                    const value =
                                        e.target.value as
                                        "all" |
                                        "name" |
                                        "course";

                                    setSearchType(value);

                                    setSearchTerm("");

                                    setCurrentPage(1);

                                    fetchStudents();

                                }}
                            >

                                <option value="all">
                                    All
                                </option>

                                <option value="name">
                                    Name
                                </option>

                                <option value="course">
                                    Course
                                </option>

                            </select>

                        </div>


                        {/* Search */}
                        <div className="col-12 col-md-6">

                            <label className="form-label">
                                Search Students
                            </label>

                            <SearchBar
                                value={searchTerm}
                                onChange={
                                    handleSearch
                                }
                                placeholder={
                                    searchType === "course"
                                        ? "Search by course..."
                                        : searchType === "name"
                                            ? "Search by name..."
                                            : "Search by name, email, mobile or course..."
                                }
                            />

                        </div>


                        {/* Sort */}
                        <div className="col-12 col-md-3">

                            <label className="form-label">
                                Sort By
                            </label>

                            <select
                                className="form-select"
                                value={sortType}
                                onChange={(e) =>
                                    handleSort(
                                        e.target.value as
                                            | "none"
                                            | "name"
                                            | "date"
                                    )
                                }
                            >

                                <option value="none">
                                    Default
                                </option>

                                <option value="name">
                                    Name (A-Z)
                                </option>

                                <option value="date">
                                    Joining Date
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* Excel Buttons */}
            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="d-flex flex-wrap gap-2">

                        <button
                            className="btn btn-success"
                            disabled={exporting}
                            onClick={() =>
                                handleExcelExport(
                                    "all"
                                )
                            }
                        >
                            📊 Export All
                        </button>

                        <button
                            className="btn btn-outline-success"
                            disabled={
                                exporting ||
                                !searchTerm.trim()
                            }
                            onClick={() =>
                                handleExcelExport(
                                    "name"
                                )
                            }
                        >
                            📊 Export By Name
                        </button>

                        <button
                            className="btn btn-outline-success"
                            disabled={
                                exporting ||
                                !searchTerm.trim()
                            }
                            onClick={() =>
                                handleExcelExport(
                                    "course"
                                )
                            }
                        >
                            📊 Export By Course
                        </button>

                        <button
                            className="btn btn-outline-primary"
                            disabled={exporting}
                            onClick={() =>
                                handleExcelExport(
                                    "sortName"
                                )
                            }
                        >
                            📊 Export Name Sorted
                        </button>

                        <button
                            className="btn btn-outline-primary"
                            disabled={exporting}
                            onClick={() =>
                                handleExcelExport(
                                    "sortDate"
                                )
                            }
                        >
                            📊 Export DOJ Sorted
                        </button>

                    </div>

                </div>

            </div>


            {/* Student Table */}
            <div className="card shadow-sm">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <h5 className="mb-0">
                            Students
                        </h5>

                        <span className="badge bg-primary">
                            {students.length} Students
                        </span>

                    </div>


                    <div className="table-responsive">

                        <table className="table table-bordered table-hover table-striped align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Mobile
                                    </th>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Address
                                    </th>

                                    <th>
                                        Gender
                                    </th>

                                    <th>
                                        Date Of Joining
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {currentStudents.length >
                                0 ? (

                                    currentStudents.map(
                                        (student) => (

                                            <tr
                                                key={
                                                    student.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        student.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.mobile
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.course
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.address
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.gender
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        student.dateOfJoining
                                                    }
                                                </td>

                                                <td>

                                                    <div className="d-flex flex-wrap gap-1">

                                                        <Link
                                                            to={`/view-student/${student.id}`}
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            to={`/edit-student/${student.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                openDeleteDialog(
                                                                    student
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={9}
                                            className="text-center py-5"
                                        >
                                            <h5>
                                                No students found
                                            </h5>

                                            <p className="text-muted mb-0">
                                                Try changing your search criteria.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}
                    <Pagination
                        currentPage={
                            currentPage
                        }
                        totalPages={
                            totalPages
                        }
                        onPageChange={
                            setCurrentPage
                        }
                    />

                </div>

            </div>


            {/* Delete Confirmation */}
            <ConfirmationDialog
                show={
                    showDeleteDialog
                }
                title="Delete Student"
                message={
                    studentToDelete
                        ? `Are you sure you want to delete "${studentToDelete.name}"? This action cannot be undone.`
                        : "Are you sure you want to delete this student?"
                }
                onConfirm={
                    confirmDelete
                }
                onCancel={
                    closeDeleteDialog
                }
            />

        </div>
    );
}

export default StudentList;