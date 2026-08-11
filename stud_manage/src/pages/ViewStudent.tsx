import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Student } from "../models/Student";
import { getStudentById } from "../services/StudentService";

function ViewStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStudent = async () => {
        if (!id) {
            setError("Student ID not found.");
            setLoading(false);
            return;
        }

        try {
            const response = await getStudentById(Number(id));

            setStudent(response.data);
        } catch {
            setError("Unable to load student details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    if (loading) {
        return <h2 className="text-center mt-5">Loading Student Details...</h2>;
    }

    if (error) {
        return <h2 className="text-danger text-center mt-5">{error}</h2>;
    }

    if (!student) {
        return null;
    }

    return (
        <div className="container mt-3 mt-md-5 px-3 px-md-4">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-11 col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="text-center mb-0">Student Details</h3>
                        </div>

                        <div className="card-body p-3 p-md-4">
                            <p>
                                <strong>ID :</strong> {student.id}
                            </p>

                            <p>
                                <strong>Name :</strong> {student.name}
                            </p>

                            <p>
                                <strong>Email :</strong> {student.email}
                            </p>

                            <p>
                                <strong>Mobile :</strong> {student.mobile}
                            </p>

                            <p>
                                <strong>Course :</strong> {student.course}
                            </p>

                            <p>
                                <strong>Address :</strong> {student.address}
                            </p>

                            <p>
                                <strong>Gender :</strong> {student.gender}
                            </p>

                            {/* Uncomment this after adding dateOfJoining to Student.ts */}

                            {
                                <p>
                                    <strong>Date Of Joining :</strong> {new Date(student.dateOfJoining).toLocaleDateString("en-GB")}
                                </p>
                            }
                        </div>

                        <div className="card-footer text-center">
                            <button
                                className="btn btn-secondary w-100 w-md-auto"
                                onClick={() => navigate("/students")}
                            >
                                ← Back to Student List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewStudent;

