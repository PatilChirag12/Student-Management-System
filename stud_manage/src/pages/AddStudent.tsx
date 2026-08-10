// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import type { Student } from "../models/Student";
// import { createStudent } from "../services/StudentService";

// function AddStudent() {
//   const navigate = useNavigate();

//   const [student, setStudent] = useState<Student>({
//     name: "",
//     email: "",
//     mobile: "",
//     course: "",
//     address: "",
//     gender: "",
//     dateOfJoining: ""
//   });

//   const [error, setError] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;

//     setStudent({
//       ...student,
//       [name]: value,
//     });
//   };

//   const resetForm = () => {
//     setStudent({
//       name: "",
//       email: "",
//       mobile: "",
//       course: "",
//       address: "",
//       gender: "",
//       dateOfJoining: ""
//     });

//     setError("");
//   };

//   const saveStudent = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       student.name.trim() === "" ||
//       student.email.trim() === "" ||
//       student.mobile.trim() === "" ||
//       student.course.trim() === "" ||
//       student.address.trim() === "" ||
//       student.gender.trim() === "" ||
//       student.dateOfJoining.trim() === ""
//     ) {
//       setError("All fields are mandatory.");
//       return;
//     }

//     if (!/^\d{10}$/.test(student.mobile)) {
//       setError("Mobile number should contain exactly 10 digits.");
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(student.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     setError("");

//     try {
//       await createStudent(student);

//       alert("Student Added Successfully.");

//       navigate("/students");
//     } catch (err) {
//       console.error(err);
//       setError("Unable to save student.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8 col-lg-6">
//           <div className="card shadow">

//             <div className="card-header bg-primary text-white">
//               <h2 className="text-center mb-0 fs-4 fs-md-2">
//                 Add Student
//               </h2>
//             </div>

//             <div className="card-body p-3 p-md-4">
//               {error && <div className="alert alert-danger">{error}</div>}

//               <form onSubmit={saveStudent}>
//                 {/* Name */}

//                 <div className="mb-3">
//                   <label className="form-label">Name</label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={student.name}
//                     onChange={handleChange}
//                     placeholder="Enter Student Name"
//                   />
//                 </div>

//                 {/* Email */}

//                 <div className="mb-3">
//                   <label className="form-label">Email</label>

//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={student.email}
//                     onChange={handleChange}
//                     placeholder="Enter Email Address"
//                   />
//                 </div>

//                 {/* Mobile */}

//                 <div className="mb-3">
//                   <label className="form-label">Mobile Number</label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     name="mobile"
//                     value={student.mobile}
//                     onChange={handleChange}
//                     placeholder="Enter Mobile Number"
//                   />
//                 </div>

//                 {/* Course */}

//                 <div className="mb-3">
//                   <label className="form-label">Course</label>

//                   <select
//                     className="form-select"
//                     name="course"
//                     value={student.course}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Course</option>

//                     <option value="Java">Java</option>

//                     <option value="Spring Boot">Spring Boot</option>

//                     <option value="React">React</option>

//                     <option value="Python">Python</option>
//                   </select>
//                 </div>

//                 {/* Address */}

//                 <div className="mb-3">
//                   <label className="form-label">Address</label>

//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     name="address"
//                     value={student.address}
//                     onChange={handleChange}
//                     placeholder="Enter Address"
//                   ></textarea>
//                 </div>

//                 {/* Gender */}

//                 <div className="mb-3">
//                   <label className="form-label d-block">Gender</label>

//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="gender"
//                       value="Male"
//                       checked={student.gender === "Male"}
//                       onChange={handleChange}
//                     />

//                     <label className="form-check-label">Male</label>
//                   </div>

//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="gender"
//                       value="Female"
//                       checked={student.gender === "Female"}
//                       onChange={handleChange}
//                     />

//                     <label className="form-check-label">Female</label>
//                   </div>

//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="gender"
//                       value="Other"
//                       checked={student.gender === "Other"}
//                       onChange={handleChange}
//                     />

//                     <label className="form-check-label">Other</label>
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">
//                     Date Of Joining
//                   </label>

//                   <input
//                     type="date"
//                     className="form-control"
//                     name="dateOfJoining"
//                     value={student.dateOfJoining}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-2">
//                   <button

//                     type="submit"

//                     className="btn btn-success"

//                     disabled={

//                       !student.name ||

//                       !student.email ||

//                       !student.mobile ||

//                       !student.course ||

//                       !student.address ||

//                       !student.gender

//                     }
//                   >

//                     Save
//                   </button>

//                   <button

//                     type="button"

//                     className="btn btn-secondary"

//                     onClick={resetForm}
//                   >

//                     Reset
//                   </button>

//                   <button

//                     type="button"

//                     className="btn btn-danger"

//                     onClick={() => navigate("/students")}
//                   >

//                     Cancel
//                   </button>
//                 </div>

//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddStudent;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import AlertMessage from "../components/AlertMessage";

import {
    createStudent
} from "../services/StudentService";

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

    const resetForm = () => {

        setStudent(initialStudent);
        setError("");
        setSuccess("");

    };

    const validate = (): boolean => {

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

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(student.email)
        ) {

            setError(
                "Please enter a valid email address."
            );

            return false;
        }

        const selectedDate =
            new Date(student.dateOfJoining);

        const today = new Date();

        today.setHours(
            23, 59, 59, 999
        );

        if (selectedDate > today) {

            setError(
                "Date of joining cannot be a future date."
            );

            return false;
        }

        return true;
    };

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

            if (
                err.response?.status === 409
            ) {

                setError(
                    err.response.data ||
                    "Email or mobile number already exists."
                );

            } else if (
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

            } else {

                setError(
                    "Unable to save student. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }
    };

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
                                />
                            )}

                            <StudentForm
                                student={student}
                                onChange={handleChange}
                                onSubmit={saveStudent}
                                onReset={resetForm}
                                submitText="Save Student"
                                loading={loading}
                            />

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