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
  dateOfJoining: "",
};

function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentFormData>(emptyStudent);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ==========================================
  // FETCH STUDENT
  // ==========================================

  const fetchStudent = async () => {
    if (!id) {
      setError("Student ID not found.");
      setLoading(false);

      return;
    }

    try {
      const response = await getStudentById(Number(id));

      const data = response.data;

      /*
       * Backend returns:
       *
       * 2026-08-03T00:00:00.000Z
       *
       * HTML date input requires:
       *
       * 2026-08-03
       */

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

        dateOfJoining: formattedDate,
      });
    } catch (err) {
      console.error(err);

      setError("Unable to load student details.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD STUDENT
  // ==========================================

  useEffect(() => {
    fetchStudent();
  }, [id]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setStudent((previous) => ({
      ...previous,

      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // VALIDATION
  // ==========================================

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
      setError("All fields are mandatory.");

      return false;
    }

    // Name length

    if (student.name.trim().length > 50) {
      setError("Name must contain 1 to 50 characters.");

      return false;
    }

    // Mobile

    if (!/^[0-9]{10}$/.test(student.mobile)) {
      setError("Mobile number should contain exactly 10 digits.");

      return false;
    }

    // Email

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      setError("Please enter a valid email address.");

      return false;
    }

    // Date

    if (!student.dateOfJoining) {
      setError("Date of joining is required.");

      return false;
    }

    /*
     * Compare YYYY-MM-DD directly.
     * This avoids timezone problems.
     */

    const today = new Date().toISOString().split("T")[0];

    if (student.dateOfJoining > today) {
      setError("Date of joining cannot be a future date.");

      return false;
    }

    return true;
  };

  // ==========================================
  // FORM VALID STATE
  // ==========================================

  const today = new Date().toISOString().split("T")[0];

  const isFormValid =
    student.name.trim() !== "" &&
    student.name.trim().length <= 50 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email) &&
    /^[0-9]{10}$/.test(student.mobile) &&
    student.course.trim() !== "" &&
    student.address.trim() !== "" &&
    student.gender.trim() !== "" &&
    student.dateOfJoining.trim() !== "" &&
    student.dateOfJoining <= today;

  // ==========================================
  // UPDATE STUDENT
  // ==========================================

  const saveStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate

    if (!validate()) {
      return;
    }

    // Check ID

    if (!id) {
      setError("Student ID not found.");

      return;
    }

    try {
      setSaving(true);

      await updateStudent(Number(id), student);

      setSuccess("Student updated successfully.");

      /*
       * Go to View Student page
       * after successful update.
       */

      setTimeout(() => {
        navigate(`/view-student/${id}`);
      }, 1000);
    } catch (err: any) {
      console.error(err);

      // Duplicate email/mobile

      if (err.response?.status === 409) {
        setError(err.response.data || "Email or mobile number already exists.");
      }

      // Validation error
      else if (err.response?.status === 400) {
        const backendMessage = err.response.data;

        setError(
          typeof backendMessage === "string"
            ? backendMessage
            : "Please check the entered information.",
        );
      }

      // Student not found
      else if (err.response?.status === 404) {
        setError("Student not found.");
      }

      // Other error
      else {
        setError("Unable to update student. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetForm = () => {
    fetchStudent();

    setError("");
    setSuccess("");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <LoadingSpinner />;
  }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow">
            {/* HEADER */}

            <div className="card-header bg-warning">
              <h2 className="text-center mb-0">Edit Student</h2>
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

              {success && <AlertMessage type="success" message={success} />}

              {/* FORM */}

              <StudentForm
                student={student}
                onChange={handleChange}
                onSubmit={saveStudent}
                onReset={resetForm}
                submitText="Update"
                loading={saving}
                isFormValid={isFormValid}
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
