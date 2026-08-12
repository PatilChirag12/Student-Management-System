import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import AlertMessage from "../components/AlertMessage";
import LoadingSpinner from "../components/LoadingSpinner";

import { getStudentById, updateStudent } from "../services/StudentService";

import type { Student } from "../models/Student";

type StudentFormData = Omit<Student, "id">;

const emptyStudent: StudentFormData = {
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
function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] =
        useState<StudentFormData>(emptyStudent);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [fieldErrors, setFieldErrors] =
        useState<FieldErrors>({});
    // ==========================
    // FETCH STUDENT
    // ==========================

    const fetchStudent = async () => {
        if (!id) {
            setError("Student ID not found.");
            setLoading(false);
            return;
        }

        try {
            const response = await getStudentById(Number(id));
            const data = response.data;

            // Backend returns:
            // 2026-08-03T00:00:00.000Z
            // HTML date input requires:
            // 2026-08-03

            const formattedDate = data.dateOfJoining
                ? data.dateOfJoining.split("T")[0]
                : "";

            setStudent({
                name: data.name ?? "",
                email: data.email ?? "",
                mobile: data.mobile ?? "",
                course: data.course ?? "",
                address: data.address ?? "",
                gender: data.gender ?? "",
                dateOfJoining: formattedDate
            });
        } catch (err) {
            console.error(err);
            setError("Unable to load student details.");
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // LOAD STUDENT
    // ==========================

    useEffect(() => {
        fetchStudent();
    }, [id]);

    // ==========================
    // HANDLE CHANGE
    // ==========================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;

        setStudent((previous) => ({
            ...previous,
            [name]: value
        }));

        // Remove error for the field being edited
        setFieldErrors((previous) => ({
            ...previous,
            [name]: undefined
        }));

        setError("");
        setSuccess("");
    };
    // ==========================
    // VALIDATION
    // ==========================

    const validate = (): boolean => {

        const errors: FieldErrors = {};

        // NAME
        if (!student.name.trim()) {

            errors.name =
                "Please enter student name.";

        } else if (student.name.trim().length > 50) {

            errors.name =
                "Name must contain 1 to 50 characters.";

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

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];

            if (student.dateOfJoining > today) {

                errors.dateOfJoining =
                    "Date of joining cannot be a future date.";

            }
        }


        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // ==========================
    // UPDATE STUDENT
    // ==========================

    const saveStudent = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        // Frontend validation
        if (!validate()) {

            setTimeout(() => {

                const firstError =
                    document.querySelector(".is-invalid");

                firstError?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 50);

            return;
        }


        if (!id) {

            setError("Student ID not found.");

            return;
        }


        try {

            setSaving(true);

            await updateStudent(
                Number(id),
                student
            );

            setSuccess(
                "Student updated successfully."
            );

            setTimeout(() => {

                navigate(`/view-student/${id}`);

            }, 1000);

        } catch (err: any) {

            console.error(err);

            const responseData =
                err?.response?.data;


            if (
                typeof responseData === "string" &&
                responseData.trim()
            ) {

                setError(responseData);

            } else if (
                responseData?.message
            ) {

                setError(responseData.message);

            } else if (
                responseData?.error
            ) {

                setError(responseData.error);

            } else if (
                err?.response?.status === 404
            ) {

                setError("Student not found.");

            } else {

                setError(
                    "Unable to update student. Please try again."
                );
            }


            // Go to top where backend error is displayed
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } finally {

            setSaving(false);

        }
    };

    // ==========================
    // RESET
    // ==========================

    const resetForm = () => {

        fetchStudent();

        setFieldErrors({});

        setError("");

        setSuccess("");
    };

    // ==========================
    // LOADING
    // ==========================

    if (loading) {
        return <LoadingSpinner />;
    }

    // ==========================
    // JSX
    // ==========================

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card shadow">

                        {/* HEADER */}
                        <div className="card-header bg-warning">
                            <h2 className="text-center mb-0">
                                Edit Student
                            </h2>
                        </div>

                        {/* BODY */}
                        <div className="card-body p-3 p-md-4">

                            {/* ERROR */}
                            {error && (
                                <AlertMessage
                                    type="danger"
                                    message={error}
                                    onClose={() => setError("")}
                                />
                            )}

                            {/* SUCCESS */}
                            {success && (
                                <AlertMessage
                                    type="success"
                                    message={success}
                                />
                            )}

                            <StudentForm
                                student={student}
                                onChange={handleChange}
                                onSubmit={saveStudent}
                                onReset={resetForm}
                                submitText="Update"
                                loading={saving}
                                errors={fieldErrors}
                            />

                            {/* CANCEL */}
                            <div className="text-center mt-3">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => navigate("/students")}
                                    disabled={saving}
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

export default EditStudent;
