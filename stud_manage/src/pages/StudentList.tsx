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

    // ==========================================
    // STATE
    // ==========================================

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

    const [showDeleteDialog, setShowDeleteDialog] =
        useState(false);

    const [studentToDelete, setStudentToDelete] =
        useState<Student | null>(null);

    const [deleting, setDeleting] =
        useState(false);

    const [exporting, setExporting] =
        useState(false);


    // ==========================================
    // PAGINATION CONFIGURATION
    // ==========================================

    const studentsPerPage = 7;


    // ==========================================
    // GET ALL STUDENTS
    // ==========================================

    const fetchStudents = useCallback(async () => {

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

    }, []);


    // ==========================================
    // LOAD STUDENTS ON PAGE LOAD
    // ==========================================

    useEffect(() => {

        fetchStudents();

    }, [fetchStudents]);


    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = (
        value: string
    ) => {

        setSearchTerm(value);

        // Whenever search changes,
        // go back to first page.
        setCurrentPage(1);

        setError("");

    };


    // ==========================================
    // FILTER STUDENTS
    // ==========================================

    const filteredStudents =
        students.filter((student) => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            // Empty search
            if (!search) {
                return true;
            }


            // Search by name
            if (searchType === "name") {

                return student.name
                    .toLowerCase()
                    .includes(search);

            }


            // Search by course
            if (searchType === "course") {

                return student.course
                    .toLowerCase()
                    .includes(search);

            }


            // Search by ALL
            return (
                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.email
                    .toLowerCase()
                    .includes(search)

                ||

                student.mobile
                    .toLowerCase()
                    .includes(search)

                ||

                student.course
                    .toLowerCase()
                    .includes(search)
            );

        });


    // ==========================================
    // TOTAL PAGES
    // ==========================================

    const totalPages =
        Math.ceil(
            filteredStudents.length /
            studentsPerPage
        );


    // ==========================================
    // KEEP CURRENT PAGE VALID
    // ==========================================

    useEffect(() => {

        if (
            totalPages > 0 &&
            currentPage > totalPages
        ) {

            setCurrentPage(totalPages);

        }

        if (
            totalPages === 0 &&
            currentPage !== 1
        ) {

            setCurrentPage(1);

        }

    }, [
        currentPage,
        totalPages
    ]);


    // ==========================================
    // CURRENT PAGE STUDENTS
    // ==========================================

    const indexOfLastStudent =
        currentPage *
        studentsPerPage;


    const indexOfFirstStudent =
        indexOfLastStudent -
        studentsPerPage;


    const currentStudents =
        filteredStudents.slice(
            indexOfFirstStudent,
            indexOfLastStudent
        );


    // ==========================================
    // SORTING
    // ==========================================

    const handleSort = async (
        type:
            | "none"
            | "name"
            | "date"
    ) => {

        setSortType(type);

        setCurrentPage(1);

        setError("");


        // Default order
        if (type === "none") {

            await fetchStudents();

            return;

        }


        try {

            setLoading(true);


            let response;


            // Name sorting
            if (type === "name") {

                response =
                    await getStudentsSortedByName();

            }

            // Date sorting
            else {

                response =
                    await getStudentsSortedByDate();

            }


            setStudents(
                response.data
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to sort students."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // DELETE DIALOG
    // ==========================================

    const openDeleteDialog = (
        student: Student
    ) => {

        setStudentToDelete(
            student
        );

        setShowDeleteDialog(
            true
        );

    };


    // ==========================================
    // CLOSE DELETE DIALOG
    // ==========================================

    const closeDeleteDialog = () => {

        if (deleting) {
            return;
        }


        setShowDeleteDialog(
            false
        );

        setStudentToDelete(
            null
        );

    };


    // ==========================================
    // CONFIRM DELETE
    // ==========================================

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


            setShowDeleteDialog(
                false
            );

            setStudentToDelete(
                null
            );


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


    // ==========================================
    // DOWNLOAD FILE
    // ==========================================

    const downloadFile = (
        data: Blob,
        fileName: string
    ) => {

        const url =
            window.URL.createObjectURL(
                data
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;

        link.download =
            fileName;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        window.URL.revokeObjectURL(
            url
        );

    };


    // ==========================================
    // EXCEL EXPORT
    // ==========================================

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


            // ----------------------------------
            // Export All
            // ----------------------------------

            if (type === "all") {

                response =
                    await downloadAllStudentsExcel();

                fileName =
                    "students.xlsx";

            }


            // ----------------------------------
            // Export By Name
            // ----------------------------------

            else if (
                type === "name"
            ) {

                if (
                    !searchTerm.trim()
                ) {

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

            }


            // ----------------------------------
            // Export By Course
            // ----------------------------------

            else if (
                type === "course"
            ) {

                if (
                    !searchTerm.trim()
                ) {

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

            }


            // ----------------------------------
            // Export Name Sorted
            // ----------------------------------

            else if (
                type === "sortName"
            ) {

                response =
                    await downloadStudentsSortedByNameExcel();


                fileName =
                    "students_sorted_by_name.xlsx";

            }


            // ----------------------------------
            // Export DOJ Sorted
            // ----------------------------------

            else {

                response =
                    await downloadStudentsSortedByDateExcel();


                fileName =
                    "students_sorted_by_doj.xlsx";

            }


            // Download
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


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <LoadingSpinner />
        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="container-fluid py-4 px-3 px-md-4">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div
                className="
                    d-flex
                    flex-column
                    flex-md-row
                    justify-content-between
                    align-items-md-center
                    gap-3
                    mb-4
                "
            >

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


            {/* ================================= */}
            {/* ALERTS */}
            {/* ================================= */}

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


            {/* ================================= */}
            {/* SEARCH + SORT */}
            {/* ================================= */}

            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3">


                        {/* Search Type */}

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
                                        | "all"
                                        | "name"
                                        | "course";


                                    setSearchType(
                                        value
                                    );


                                    setSearchTerm(
                                        ""
                                    );


                                    setCurrentPage(
                                        1
                                    );


                                    setError("");

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
                                value={
                                    searchTerm
                                }
                                onChange={
                                    handleSearch
                                }
                                placeholder={
                                    searchType ===
                                    "course"

                                        ? "Search by course..."

                                        : searchType ===
                                          "name"

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
                                value={
                                    sortType
                                }
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


            {/* ================================= */}
            {/* EXCEL BUTTONS */}
            {/* ================================= */}

            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="d-flex flex-wrap gap-2">


                        {/* Export All */}

                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={
                                exporting
                            }
                            onClick={() =>
                                handleExcelExport(
                                    "all"
                                )
                            }
                        >
                            📊 Export All
                        </button>


                        {/* Export By Name */}

                        <button
                            type="button"
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


                        {/* Export By Course */}

                        <button
                            type="button"
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


                        {/* Name Sorted */}

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            disabled={
                                exporting
                            }
                            onClick={() =>
                                handleExcelExport(
                                    "sortName"
                                )
                            }
                        >
                            📊 Export Name Sorted
                        </button>


                        {/* DOJ Sorted */}

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            disabled={
                                exporting
                            }
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


            {/* ================================= */}
            {/* STUDENT TABLE */}
            {/* ================================= */}

            <div className="card shadow-sm">

                <div className="card-body">


                    {/* Table Header */}

                    <div
                        className="
                            d-flex
                            justify-content-between
                            align-items-center
                            mb-3
                        "
                    >

                        <h5 className="mb-0">
                            Students
                        </h5>


                        <span className="badge bg-primary">
                            {filteredStudents.length} Students
                        </span>

                    </div>


                    {/* Table */}

                    <div className="table-responsive">

                        <table
                            className="
                                table
                                table-bordered
                                table-hover
                                table-striped
                                align-middle
                            "
                        >

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

                                                    <div
                                                        className="
                                                            d-flex
                                                            flex-wrap
                                                            gap-1
                                                        "
                                                    >

                                                        {/* View */}

                                                        <Link
                                                            to={`/view-student/${student.id}`}
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            View
                                                        </Link>


                                                        {/* Edit */}

                                                        <Link
                                                            to={`/edit-student/${student.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >
                                                            Edit
                                                        </Link>


                                                        {/* Delete */}

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


                    {/* ================================= */}
                    {/* PAGINATION */}
                    {/* ================================= */}

                    {totalPages > 1 && (

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

                    )}

                </div>

            </div>


            {/* ================================= */}
            {/* DELETE CONFIRMATION */}
            {/* ================================= */}

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