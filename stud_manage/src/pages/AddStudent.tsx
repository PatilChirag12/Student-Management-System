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

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] =
        useState<StudentFormData>(initialStudent);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // ==========================
    // HANDLE INPUT CHANGE
    // ==========================

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

        setError("");
    };


    // ==========================
    // RESET FORM
    // ==========================

    const resetForm = () => {

        setStudent({
            ...initialStudent
        });

        setError("");
        setSuccess("");
    };


    // ==========================
    // VALIDATION
    // ==========================

    const validate = (): boolean => {

        // Required fields
        if (
            !student.name.trim() ||
            !student.email.trim() ||
            !student.mobile.trim() ||
            !student.course.trim() ||
            !student.address.trim() ||
            !student.gender.trim() ||
            !student.dateOfJoining.trim()
        ) {

            setError(
                "All fields are mandatory."
            );

            return false;
        }


        // Mobile validation
        if (
            !/^[0-9]{10}$/.test(
                student.mobile
            )
        ) {

            setError(
                "Mobile number should contain exactly 10 digits."
            );

            return false;
        }


        // Email validation
        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                student.email
            )
        ) {

            setError(
                "Please enter a valid email address."
            );

            return false;
        }


        // Date validation
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

            setError(
                "Date of joining cannot be a future date."
            );

            return false;
        }


        return true;
    };


    // ==========================
    // SAVE BUTTON STATE
    // ==========================

    const isFormValid =
        student.name.trim() !== "" &&
        student.email.trim() !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            student.email
        ) &&
        /^\d{10}$/.test(
            student.mobile
        ) &&
        student.course.trim() !== "" &&
        student.address.trim() !== "" &&
        student.gender.trim() !== "" &&
        student.dateOfJoining.trim() !== "" &&
        new Date(student.dateOfJoining) <=
            new Date();


    // ==========================
    // SAVE STUDENT
    // ==========================

    const saveStudent = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!validate()) {
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

            console.error(err);


            // Duplicate email/mobile
            if (
                err.response?.status === 409
            ) {

                setError(
                    err.response.data ||
                    "Email or mobile number already exists."
                );

            }

            // Validation error
            else if (
                err.response?.status === 400
            ) {

                const backendMessage =
                    err.response.data;

                setError(
                    typeof backendMessage ===
                    "string"
                        ? backendMessage
                        : "Please check the entered information."
                );

            }

            else {

                setError(
                    "Unable to save student. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // ==========================
    // JSX
    // ==========================

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


                            {/* ERROR */}
                            {error && (

                                <AlertMessage
                                    type="danger"
                                    message={error}
                                    onClose={() =>
                                        setError("")
                                    }
                                />

                            )}


                            {/* SUCCESS */}
                            {success && (

                                <AlertMessage
                                    type="success"
                                    message={success}
                                />

                            )}


                            {/* STUDENT FORM */}

                            <StudentForm
                                student={student}
                                onChange={handleChange}
                                onSubmit={saveStudent}
                                onReset={resetForm}
                                submitText="Save"
                                loading={loading}
                                isFormValid={isFormValid}
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