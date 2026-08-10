import { Link } from "react-router-dom";
import type { Student } from "../models/Student";

interface StudentCardProps {
    student: Student;
    onDelete: (id: number) => void;
}

function StudentCard({
    student,
    onDelete
}: StudentCardProps) {

    return (
        <div className="card h-100 shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <h5 className="card-title mb-0">
                        {student.name}
                    </h5>

                    <span className="badge bg-primary">
                        #{student.id}
                    </span>

                </div>

                <p className="card-text mb-2">
                    <strong>Email:</strong>{" "}
                    {student.email}
                </p>

                <p className="card-text mb-2">
                    <strong>Mobile:</strong>{" "}
                    {student.mobile}
                </p>

                <p className="card-text mb-2">
                    <strong>Course:</strong>{" "}
                    {student.course}
                </p>

                <p className="card-text mb-2">
                    <strong>Gender:</strong>{" "}
                    {student.gender}
                </p>

                <p className="card-text mb-0">
                    <strong>Joining Date:</strong>{" "}
                    {student.dateOfJoining}
                </p>

            </div>

            <div className="card-footer bg-transparent">

                <div className="d-flex gap-2 flex-wrap">

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
                            student.id &&
                            onDelete(student.id)
                        }
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default StudentCard;