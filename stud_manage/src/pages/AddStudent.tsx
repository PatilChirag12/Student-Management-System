import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import AlertMessage from "../components/AlertMessage";

import { createStudent } from "../services/StudentService";

import type { Student } from "../models/Student";

type StudentFormData = Omit<Student, "id">;

const initialStudent: StudentFormData = {
    name: "",
    email: "",
    mobile: "",
    course: "",
    address: "",
    gender: "",
    dateOfJoining: ""
};

type FieldErrors = {
    name?: string;
    email?: string;
    mobile?: string;
    course?: string;
    address?: string;
    gender?: string;
    dateOfJoining?: string;
};

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] =
        useState<StudentFormData>(initialStudent);

    const [fieldErrors, setFieldErrors] =
        useState<FieldErrors>({});

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;

        setStudent((previous) => ({
            ...previous,
            [name]: value
        }));

        // Remove field error when user starts correcting it
        setFieldErrors((previous) => ({
            ...previous,
            [name]: undefined
        }));

        // Remove backend error
        setError("");
    };


    // ==========================================
    // RESET
    // ==========================================

    const resetForm = () => {

        setStudent({
            ...initialStudent
        });

        setFieldErrors({});

        setError("");

        setSuccess("");
    };


    // ==========================================
    // VALIDATE FORM
    // ==========================================

    const validate = (): boolean => {

        const errors: FieldErrors = {};


        // NAME
        if (!student.name.trim()) {

            errors.name =
                "Please enter student name.";

        }


        // EMAIL
        if (!student.email.trim()) {

            errors.email =
                "Please enter an email address.";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                student.email.trim()
            )
        ) {

            errors.email =
                "Please enter a valid email address.";

        }


        // MOBILE
        if (!student.mobile.trim()) {

            errors.mobile =
                "Please enter a phone number.";

        } else if (
            !/^[0-9]{10}$/.test(
                student.mobile.trim()
            )
        ) {

            errors.mobile =
                "Phone number must contain exactly 10 digits.";

        }


        // COURSE
        if (!student.course.trim()) {

            errors.course =
                "Please select a course.";

        }


        // ADDRESS
        if (!student.address.trim()) {

            errors.address =
                "Please enter an address.";

        }


        // GENDER
        if (!student.gender.trim()) {

            errors.gender =
                "Please select a gender.";

        }


        // DATE
        if (!student.dateOfJoining.trim()) {

            errors.dateOfJoining =
                "Please select date of joining.";

        } else {

            const selectedDate =
                new Date(student.dateOfJoining);

            const today = new Date();

            today.setHours(
                23,
                59,
                59,
                999
            );

            if (selectedDate > today) {

                errors.dateOfJoining =
                    "Date of joining cannot be a future date.";

            }
        }


        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };


    // ==========================================
    // EXTRACT BACKEND ERROR
    // ==========================================

    const getBackendError = (err: any): string => {

        const responseData =
            err?.response?.data;

        // String response
        if (
            typeof responseData === "string" &&
            responseData.trim()
        ) {

            return responseData;
        }


        // Spring Boot JSON response
        if (
            responseData?.message
        ) {

            return responseData.message;
        }


        // Spring Boot error
        if (
            responseData?.error
        ) {

            return responseData.error;
        }


        // Axios error message
        if (
            err?.message
        ) {

            return err.message;
        }


        return "Unable to save student. Please try again.";
    };


    // ==========================================
    // SAVE STUDENT
    // ==========================================

    const saveStudent = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");

        setSuccess("");


        // Validate frontend
        if (!validate()) {

            // Scroll to first error
            setTimeout(() => {

                const firstError =
                    document.querySelector(
                        ".is-invalid"
                    );

                firstError?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 50);

            return;
        }


        try {

            setLoading(true);

            await createStudent(student);


            setSuccess(
                "Student added successfully."
            );


            setTimeout(() => {

                navigate("/students");

            }, 1000);


        } catch (err: any) {

            console.error(
                "Student save error:",
                err
            );


            // IMPORTANT:
            // Backend/database errors appear
            // at the TOP of the page.

            setError(
                getBackendError(err)
            );


            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <div className="container py-4">

            <div className="row justify-content-center">

                <div className="col-12 col-lg-8">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h2 className="text-center mb-0">
                                Add Student
                            </h2>

                        </div>


                        <div className="card-body p-3 p-md-4">


                            {/* ==================================
                                BACKEND / DATABASE ERROR
                            ================================== */}

                            {error && (

                                <div className="mb-4">

                                    <AlertMessage
                                        type="danger"
                                        message={error}
                                        onClose={() =>
                                            setError("")
                                        }
                                    />

                                </div>

                            )}


                            {/* SUCCESS */}

                            {success && (

                                <div className="mb-4">

                                    <AlertMessage
                                        type="success"
                                        message={success}
                                    />

                                </div>

                            )}


                            {/* FORM */}

                            <StudentForm
                                student={student}
                                onChange={handleChange}
                                onSubmit={saveStudent}
                                onReset={resetForm}
                                submitText="Save"
                                loading={loading}
                                errors={fieldErrors}
                            />


                            {/* CANCEL */}

                            <div className="text-center mt-3">

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        navigate("/students")
                                    }
                                    disabled={loading}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddStudent;