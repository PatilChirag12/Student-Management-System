import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Student } from "../models/Student";

import {
    getAllStudents,
    getStudentCountByCourse
} from "../services/StudentService";

import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


interface CourseData {
    name: string;
    value: number;
    percentage: string;
}


function Dashboard() {

    const [students, setStudents] =
        useState<Student[]>([]);

    const [courseData, setCourseData] =
        useState<CourseData[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
     * ============================
     * PIE CHART COLORS
     * ============================
     */

    const PIE_COLORS = [
        "#0d6efd",
        "#198754",
        "#0dcaf0",
        "#ffc107",
        "#dc3545",
        "#6f42c1",
        "#fd7e14",
        "#20c997",
        "#d63384",
        "#6610f2",
        "#6c757d",
        "#1982c4"
    ];


    /*
     * ============================
     * LOAD DASHBOARD DATA
     * ============================
     */

    useEffect(() => {

        const loadDashboardData = async () => {

            try {

                setLoading(true);

                setError("");


                /*
                 * Get all students
                 */
                const studentsResponse =
                    await getAllStudents();


                setStudents(
                    studentsResponse.data
                );


                /*
                 * Get course count
                 *
                 * Backend response:
                 *
                 * [
                 *   ["Java", 5],
                 *   ["React", 10],
                 *   ["Python", 7]
                 * ]
                 */

                const courseResponse =
                    await getStudentCountByCourse();


                const rawCourseData =
                    courseResponse.data;


                /*
                 * Calculate total students
                 * from course counts.
                 */

                const totalCourseStudents =
                    rawCourseData.reduce(
                        (
                            total: number,
                            item: Object[]
                        ) => {

                            return total +
                                Number(item[1]);

                        },
                        0
                    );


                /*
                 * Convert backend response
                 * into Recharts format.
                 */

                const formattedCourseData =
                    rawCourseData.map(
                        (item: Object[]) => {

                            const name =
                                String(item[0]);

                            const value =
                                Number(item[1]);


                            const percentage =
                                totalCourseStudents > 0
                                    ? (
                                        (value /
                                            totalCourseStudents) *
                                        100
                                    ).toFixed(1)
                                    : "0.0";


                            return {

                                name,

                                value,

                                percentage

                            };

                        }
                    );


                setCourseData(
                    formattedCourseData
                );


            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load dashboard data."
                );


            } finally {

                setLoading(false);

            }

        };


        loadDashboardData();

    }, []);


    /*
     * ============================
     * LOADING
     * ============================
     */

    if (loading) {

        return <LoadingSpinner />;

    }


    /*
     * ============================
     * TOTAL STUDENTS
     * ============================
     */

    const totalStudents =
        students.length;


    /*
     * ============================
     * GENDER STATISTICS
     * ============================
     */

    const maleStudents =
        students.filter(
            student =>
                student.gender
                    ?.toLowerCase() ===
                "male"
        ).length;


    const femaleStudents =
        students.filter(
            student =>
                student.gender
                    ?.toLowerCase() ===
                "female"
        ).length;


    const otherStudents =
        students.filter(
            student =>
                student.gender
                    ?.toLowerCase() ===
                "other"
        ).length;


    /*
     * ============================
     * RECENT STUDENTS
     * ============================
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


    /*
     * ============================
     * RETURN
     * ============================
     */

    return (

        <div className="container-fluid py-4 px-3 px-md-4">


            {/* ==========================
                HEADER
            ========================== */}

            <div className="mb-4">

                <h2 className="fw-bold">
                    Dashboard
                </h2>

                <p className="text-muted">
                    Student Management System Overview
                </p>

            </div>


            {/* ==========================
                ERROR
            ========================== */}

            {error && (

                <AlertMessage
                    type="danger"
                    message={error}
                    onClose={() =>
                        setError("")
                    }
                />

            )}


            {/* ==========================
                TOP STATISTICS
            ========================== */}

            <div className="row g-4 mb-4">


                {/* TOTAL STUDENTS */}

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


                {/* FIRST 3 COURSES */}

                {courseData
                    .slice(0, 3)
                    .map(
                        (course, index) => (

                            <div
                                className="col-12 col-sm-6 col-xl-3"
                                key={course.name}
                            >

                                <div className="card shadow-sm h-100">

                                    <div className="card-body">

                                        <h6 className="text-muted">

                                            {course.name}
                                            {" "}Students

                                        </h6>


                                        <h2 className="fw-bold">

                                            {course.value}

                                        </h2>


                                        <div className="progress">

                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width:
                                                        `${course.percentage}%`,
                                                    backgroundColor:
                                                        PIE_COLORS[
                                                        (index + 1) %
                                                        PIE_COLORS.length
                                                        ]
                                                }}
                                            />

                                        </div>


                                        <small className="text-muted">

                                            {course.percentage}%
                                            {" "}of total students

                                        </small>

                                    </div>

                                </div>

                            </div>

                        )
                    )}


                {/* NO COURSE */}

                {courseData.length === 0 && (

                    <div className="col-12 col-sm-6 col-xl-3">

                        <div className="card shadow-sm h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Subjects
                                </h6>

                                <h2 className="fw-bold">
                                    0
                                </h2>

                                <small className="text-muted">
                                    No subjects available
                                </small>

                            </div>

                        </div>

                    </div>

                )}

            </div>


            {/* ==========================
                PIE CHART + STATISTICS
            ========================== */}

            <div className="row g-4 mb-4">


                {/* ======================
                    PIE CHART
                ====================== */}

                <div className="col-12 col-lg-6">

                    <div className="card shadow-sm h-100">


                        <div className="card-header d-flex justify-content-between align-items-center">

                            <h5 className="mb-0">
                                Student Distribution by Course
                            </h5>

                        </div>


                        <div className="card-body">


                            {courseData.length === 0 ? (

                                <div className="text-center py-5">

                                    <div className="fs-1">
                                        📊
                                    </div>

                                    <p className="text-muted mb-0">
                                        No course data available.
                                    </p>

                                </div>

                            ) : (

                                <ResponsiveContainer
                                    width="100%"
                                    height={350}
                                >

                                    <PieChart>


                                        <Pie
                                            data={courseData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={110}
                                            innerRadius={45}
                                            paddingAngle={2}

                                            label={({
                                                name,
                                                percent
                                            }) =>
                                                `${name} ${(
                                                    (percent ?? 0) *
                                                    100
                                                ).toFixed(0)}%`
                                            }
                                        >


                                            {courseData.map(
                                                (_, index) => (

                                                    <Cell
                                                        key={
                                                            `cell-${index}`
                                                        }
                                                        fill={
                                                            PIE_COLORS[
                                                            index %
                                                            PIE_COLORS.length
                                                            ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>


                                        <Tooltip
                                            formatter={(
                                                value,
                                                name
                                            ) => [

                                                    `${value} students`,

                                                    name

                                                ]}
                                        />


                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            )}

                        </div>

                    </div>

                </div>


                {/* ======================
                    COURSE STATISTICS
                ====================== */}

                <div className="col-12 col-lg-6">

                    <div className="card shadow-sm h-100">


                        <div className="card-header">

                            <h5 className="mb-0">
                                Course Statistics
                            </h5>

                        </div>


                        <div className="card-body">


                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">


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


                                        {courseData.length > 0 ? (

                                            courseData.map(
                                                (course, index) => (

                                                    <tr
                                                        key={
                                                            course.name
                                                        }
                                                    >

                                                        <td>
                                                            {course.name}
                                                        </td>


                                                        <td>
                                                            {course.value}
                                                        </td>


                                                        <td>

                                                            <div className="d-flex align-items-center gap-2">


                                                                <div
                                                                    className="progress flex-grow-1"
                                                                    style={{
                                                                        height:
                                                                            "8px"
                                                                    }}
                                                                >


                                                                    <div
                                                                        className="progress-bar"
                                                                        style={{
                                                                            width:
                                                                                `${course.percentage}%`,

                                                                            backgroundColor:
                                                                                PIE_COLORS[
                                                                                index %
                                                                                PIE_COLORS.length
                                                                                ]
                                                                        }}
                                                                    />


                                                                </div>


                                                                <span>

                                                                    {
                                                                        course.percentage
                                                                    }%

                                                                </span>


                                                            </div>

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
                                                    No course data available.
                                                </td>

                                            </tr>

                                        )}

                                    </tbody>


                                </table>

                            </div>

                        </div>

                    </div>

                </div>


            </div>


            {/* ==========================
                GENDER + RECENT STUDENTS
            ========================== */}

            <div className="row g-4 mb-4">


                {/* GENDER */}

                <div className="col-12 col-lg-4">

                    <div className="card shadow-sm h-100">


                        <div className="card-header">

                            <h5 className="mb-0">
                                Gender Statistics
                            </h5>

                        </div>


                        <div className="card-body">


                            <div className="row text-center g-3">


                                {/* MALE */}

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


                                {/* FEMALE */}

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


                                {/* OTHER */}

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


                {/* RECENT STUDENTS */}

                <div className="col-12 col-lg-8">

                    <div className="card shadow-sm h-100">


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

                                                            {new Date(
                                                                student.dateOfJoining
                                                            ).toLocaleDateString(
                                                                "en-GB"
                                                            )}

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


            </div>


            {/* ==========================
{/* ==========================
    QUICK ACTIONS
========================== */}

            <div className="row g-4">

                <div className="col-12">

                    <div className="card shadow-sm">

                        <div className="card-header">
                            <h5 className="mb-0">
                                Quick Actions
                            </h5>
                        </div>

                        <div className="card-body">

                            <div className="row g-2">

                                {/* ADD STUDENT */}
                                <div className="col-12 col-md-4">

                                    <Link
                                        to="/add-student"
                                        className="btn btn-success w-100"
                                    >
                                        + Add Student
                                    </Link>

                                </div>


                                {/* VIEW STUDENTS */}
                                <div className="col-12 col-md-4">

                                    <Link
                                        to="/students"
                                        className="btn btn-primary w-100"
                                    >
                                        View Students
                                    </Link>

                                </div>


                                {/* ABOUT */}
                                <div className="col-12 col-md-4">

                                    <Link
                                        to="/about"
                                        className="btn btn-outline-secondary w-100"
                                    >
                                        About Project
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>

    );
}


export default Dashboard;