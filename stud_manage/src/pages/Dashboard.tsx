import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Student } from "../models/Student";

import { getAllStudents } from "../services/StudentService";

import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

function Dashboard() {

    const [students, setStudents] =
        useState<Student[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadStudents = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getAllStudents();

                setStudents(response.data);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);

            }
        };

        loadStudents();

    }, []);


    if (loading) {

        return <LoadingSpinner />;

    }


    const totalStudents =
        students.length;


    const javaStudents =
        students.filter(
            student =>
                student.course.toLowerCase() ===
                "java"
        ).length;


    const springBootStudents =
        students.filter(
            student =>
                student.course.toLowerCase() ===
                "spring boot"
        ).length;


    const reactStudents =
        students.filter(
            student =>
                student.course.toLowerCase() ===
                "react"
        ).length;


    const pythonStudents =
        students.filter(
            student =>
                student.course.toLowerCase() ===
                "python"
        ).length;


    const maleStudents =
        students.filter(
            student =>
                student.gender.toLowerCase() ===
                "male"
        ).length;


    const femaleStudents =
        students.filter(
            student =>
                student.gender.toLowerCase() ===
                "female"
        ).length;


    const otherStudents =
        students.filter(
            student =>
                student.gender.toLowerCase() ===
                "other"
        ).length;


    /*
     * Get recently joined students.
     *
     * The backend returns the date as a string.
     */
    const recentStudents =
        [...students]
            .sort(
                (a, b) =>
                    new Date(
                        b.dateOfJoining
                    ).getTime() -
                    new Date(
                        a.dateOfJoining
                    ).getTime()
            )
            .slice(0, 5);


    return (

        <div className="container-fluid py-4 px-3 px-md-4">

            {/* Header */}

            <div className="mb-4">

                <h2 className="fw-bold">
                    Dashboard
                </h2>

                <p className="text-muted">
                    Student Management System Overview
                </p>

            </div>


            {/* Error */}

            {error && (
                <AlertMessage
                    type="danger"
                    message={error}
                    onClose={() =>
                        setError("")
                    }
                />
            )}


            {/* Statistics Cards */}

            <div className="row g-4 mb-4">

                {/* Total */}

                <div className="col-12 col-sm-6 col-xl-3">

                    <div className="card shadow-sm h-100 border-primary">

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <h6 className="text-muted">
                                        Total Students
                                    </h6>

                                    <h2 className="fw-bold text-primary">
                                        {totalStudents}
                                    </h2>

                                </div>

                                <div className="fs-1">
                                    👨‍🎓
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Java */}

                <div className="col-12 col-sm-6 col-xl-3">

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Java Students
                            </h6>

                            <h2 className="fw-bold">
                                {javaStudents}
                            </h2>

                            <div className="progress">

                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width:
                                            totalStudents > 0
                                                ? `${(javaStudents / totalStudents) * 100}%`
                                                : "0%"
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Spring Boot */}

                <div className="col-12 col-sm-6 col-xl-3">

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Spring Boot Students
                            </h6>

                            <h2 className="fw-bold">
                                {springBootStudents}
                            </h2>

                            <div className="progress">

                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{
                                        width:
                                            totalStudents > 0
                                                ? `${(springBootStudents / totalStudents) * 100}%`
                                                : "0%"
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* React */}

                <div className="col-12 col-sm-6 col-xl-3">

                    <div className="card shadow-sm h-100">

                        <div className="card-body">

                            <h6 className="text-muted">
                                React Students
                            </h6>

                            <h2 className="fw-bold">
                                {reactStudents}
                            </h2>

                            <div className="progress">

                                <div
                                    className="progress-bar bg-info"
                                    role="progressbar"
                                    style={{
                                        width:
                                            totalStudents > 0
                                                ? `${(reactStudents / totalStudents) * 100}%`
                                                : "0%"
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Course + Gender */}

            <div className="row g-4 mb-4">

                {/* Courses */}

                <div className="col-12 col-lg-6">

                    <div className="card shadow-sm h-100">

                        <div className="card-header">

                            <h5 className="mb-0">
                                Course Statistics
                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-bordered align-middle">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>
                                                Course
                                            </th>

                                            <th>
                                                Students
                                            </th>

                                            <th>
                                                Percentage
                                            </th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        <tr>

                                            <td>
                                                Java
                                            </td>

                                            <td>
                                                {javaStudents}
                                            </td>

                                            <td>
                                                {totalStudents > 0
                                                    ? `${((javaStudents / totalStudents) * 100).toFixed(1)}%`
                                                    : "0%"}
                                            </td>

                                        </tr>

                                        <tr>

                                            <td>
                                                Spring Boot
                                            </td>

                                            <td>
                                                {springBootStudents}
                                            </td>

                                            <td>
                                                {totalStudents > 0
                                                    ? `${((springBootStudents / totalStudents) * 100).toFixed(1)}%`
                                                    : "0%"}
                                            </td>

                                        </tr>

                                        <tr>

                                            <td>
                                                React
                                            </td>

                                            <td>
                                                {reactStudents}
                                            </td>

                                            <td>
                                                {totalStudents > 0
                                                    ? `${((reactStudents / totalStudents) * 100).toFixed(1)}%`
                                                    : "0%"}
                                            </td>

                                        </tr>

                                        <tr>

                                            <td>
                                                Python
                                            </td>

                                            <td>
                                                {pythonStudents}
                                            </td>

                                            <td>
                                                {totalStudents > 0
                                                    ? `${((pythonStudents / totalStudents) * 100).toFixed(1)}%`
                                                    : "0%"}
                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Gender */}

                <div className="col-12 col-lg-6">

                    <div className="card shadow-sm h-100">

                        <div className="card-header">

                            <h5 className="mb-0">
                                Gender Statistics
                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="row text-center g-3">

                                <div className="col-4">

                                    <div className="border rounded p-3">

                                        <div className="fs-2">
                                            👨
                                        </div>

                                        <h4>
                                            {maleStudents}
                                        </h4>

                                        <small>
                                            Male
                                        </small>

                                    </div>

                                </div>


                                <div className="col-4">

                                    <div className="border rounded p-3">

                                        <div className="fs-2">
                                            👩
                                        </div>

                                        <h4>
                                            {femaleStudents}
                                        </h4>

                                        <small>
                                            Female
                                        </small>

                                    </div>

                                </div>


                                <div className="col-4">

                                    <div className="border rounded p-3">

                                        <div className="fs-2">
                                            👤
                                        </div>

                                        <h4>
                                            {otherStudents}
                                        </h4>

                                        <small>
                                            Other
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Recent Students */}

            <div className="row g-4">

                <div className="col-12 col-lg-8">

                    <div className="card shadow-sm">

                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h5 className="mb-0">
                                Recently Joined Students
                            </h5>

                            <Link
                                to="/students"
                                className="btn btn-sm btn-outline-primary"
                            >
                                View All
                            </Link>

                        </div>

                        <div className="card-body p-0">

                            <div className="table-responsive">

                                <table className="table table-hover mb-0">

                                    <thead>

                                        <tr>

                                            <th>
                                                Name
                                            </th>

                                            <th>
                                                Course
                                            </th>

                                            <th>
                                                Joining Date
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {recentStudents.length > 0 ? (

                                            recentStudents.map(
                                                student => (

                                                    <tr
                                                        key={
                                                            student.id
                                                        }
                                                    >

                                                        <td>
                                                            {student.name}
                                                        </td>

                                                        <td>
                                                            {student.course}
                                                        </td>

                                                        <td>
                                                            {student.dateOfJoining}
                                                        </td>

                                                    </tr>

                                                )
                                            )

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan={3}
                                                    className="text-center py-4"
                                                >
                                                    No students available.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Quick Actions */}

                <div className="col-12 col-lg-4">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            <h5 className="mb-0">
                                Quick Actions
                            </h5>

                        </div>

                        <div className="card-body d-grid gap-2">

                            <Link
                                to="/add-student"
                                className="btn btn-success"
                            >
                                + Add Student
                            </Link>

                            <Link
                                to="/students"
                                className="btn btn-primary"
                            >
                                View Students
                            </Link>

                            <Link
                                to="/about"
                                className="btn btn-outline-secondary"
                            >
                                About Project
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;