import type { Student } from "../models/Student";

interface StudentFormProps {
    student: Omit<Student, "id">;

    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;

    onSubmit: (e: React.FormEvent) => void;

    onReset?: () => void;

    submitText: string;

    loading?: boolean;

    errors: {
        name?: string;
        email?: string;
        mobile?: string;
        course?: string;
        address?: string;
        gender?: string;
        dateOfJoining?: string;
    };
}

function StudentForm({
    student,
    onChange,
    onSubmit,
    onReset,
    submitText,
    loading = false,
    errors
}: StudentFormProps) {

    return (
        <form
            onSubmit={onSubmit}
            noValidate
        >

            {/* =========================
                NAME
            ========================= */}

            <div className="mb-3">

                <label className="form-label">
                    Name
                </label>

                <input
                    type="text"
                    className={`form-control ${
                        errors.name ? "is-invalid" : ""
                    }`}
                    name="name"
                    value={student.name}
                    onChange={onChange}
                    placeholder="Enter Student Name"
                    maxLength={50}
                />

                {errors.name && (
                    <div className="invalid-feedback">
                        ⚠ {errors.name}
                    </div>
                )}

            </div>


            {/* =========================
                EMAIL
            ========================= */}

            <div className="mb-3">

                <label className="form-label">
                    Email
                </label>

                <input
                    type="email"
                    className={`form-control ${
                        errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={student.email}
                    onChange={onChange}
                    placeholder="Enter Email Address"
                />

                {errors.email && (
                    <div className="invalid-feedback">
                        ⚠ {errors.email}
                    </div>
                )}

            </div>


            {/* =========================
                MOBILE
            ========================= */}

            <div className="mb-3">

                <label className="form-label">
                    Mobile Number
                </label>

                <input
                    type="text"
                    className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                    }`}
                    name="mobile"
                    value={student.mobile}
                    onChange={onChange}
                    placeholder="Enter 10 digit mobile number"
                    maxLength={10}
                    inputMode="numeric"
                />

                {errors.mobile && (
                    <div className="invalid-feedback">
                        ⚠ {errors.mobile}
                    </div>
                )}

            </div>


            {/* =========================
                COURSE
            ========================= */}

            <div className="mb-3">

                <label className="form-label">
                    Course
                </label>

                <select
                    className={`form-select ${
                        errors.course ? "is-invalid" : ""
                    }`}
                    name="course"
                    value={student.course}
                    onChange={onChange}
                >

                    <option value="">
                        Select Course
                    </option>

                    <option value="Java">
                        Java
                    </option>

                    <option value="Spring Boot">
                        Spring Boot
                    </option>

                    <option value="React">
                        React
                    </option>

                    <option value="Python">
                        Python
                    </option>

                </select>

                {errors.course && (
                    <div className="invalid-feedback">
                        ⚠ {errors.course}
                    </div>
                )}

            </div>


            {/* =========================
                ADDRESS
            ========================= */}

            <div className="mb-3">

                <label className="form-label">
                    Address
                </label>

                <textarea
                    className={`form-control ${
                        errors.address ? "is-invalid" : ""
                    }`}
                    rows={3}
                    name="address"
                    value={student.address}
                    onChange={onChange}
                    placeholder="Enter Address"
                />

                {errors.address && (
                    <div className="invalid-feedback">
                        ⚠ {errors.address}
                    </div>
                )}

            </div>


            {/* =========================
                GENDER
            ========================= */}

            <div className="mb-3">

                <label className="form-label d-block">
                    Gender
                </label>

                <div className="form-check form-check-inline">

                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={student.gender === "Male"}
                        onChange={onChange}
                    />

                    <label className="form-check-label">
                        Male
                    </label>

                </div>


                <div className="form-check form-check-inline">

                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={student.gender === "Female"}
                        onChange={onChange}
                    />

                    <label className="form-check-label">
                        Female
                    </label>

                </div>


                <div className="form-check form-check-inline">

                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={student.gender === "Other"}
                        onChange={onChange}
                    />

                    <label className="form-check-label">
                        Other
                    </label>

                </div>

                {errors.gender && (
                    <div className="text-danger mt-2">
                        ⚠ {errors.gender}
                    </div>
                )}

            </div>


            {/* =========================
                DATE OF JOINING
            ========================= */}

            <div className="mb-3">

                <label className="form-label">
                    Date Of Joining
                </label>

                <input
                    type="date"
                    className={`form-control ${
                        errors.dateOfJoining
                            ? "is-invalid"
                            : ""
                    }`}
                    name="dateOfJoining"
                    value={student.dateOfJoining}
                    onChange={onChange}
                    max={
                        new Date()
                            .toISOString()
                            .split("T")[0]
                    }
                />

                {errors.dateOfJoining && (
                    <div className="invalid-feedback">
                        ⚠ {errors.dateOfJoining}
                    </div>
                )}

            </div>


            {/* =========================
                BUTTONS
            ========================= */}

            <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-2">

                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                >

                    {loading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                aria-hidden="true"
                            />

                            Saving...
                        </>
                    ) : (
                        `${submitText} Student`
                    )}

                </button>


                {onReset && (

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onReset}
                        disabled={loading}
                    >
                        Reset
                    </button>

                )}

            </div>

        </form>
    );
}

export default StudentForm;