// function Home() {
//     return (
//         <div className="container mt-5" style={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100vw',
//             textAlign: 'center',
//             padding: '20px'
//         }}>
//             <h1>Welcome to Student Management System</h1>
//             <p className="lead mt-3" style={{ maxWidth: '600px' }}>
//                 This page manages Records of Students efficiently via React,
//                 SpringBoot and MySQL 
//             </p>
//         </div>
//     );
// }

// export default Home;


import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-lg-9">

                    <div className="text-center">

                        <h1 className="display-5 fw-bold">
                            Welcome to Student Management System
                        </h1>

                        <p className="lead mt-3">
                            Manage student records efficiently
                            using React, Spring Boot and MySQL.
                        </p>

                        <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">

                            <Link
                                to="/students"
                                className="btn btn-primary btn-lg"
                            >
                                View Students
                            </Link>

                            <Link
                                to="/add-student"
                                className="btn btn-success btn-lg"
                            >
                                Add Student
                            </Link>

                            <Link
                                to="/dashboard"
                                className="btn btn-outline-primary btn-lg"
                            >
                                Dashboard
                            </Link>

                        </div>

                    </div>


                    <div className="row g-4 mt-5">

                        <div className="col-12 col-md-4">

                            <div className="card shadow-sm text-center h-100">

                                <div className="card-body">

                                    <div className="fs-1">
                                        👨‍🎓
                                    </div>

                                    <h5 className="mt-3">
                                        Student Management
                                    </h5>

                                    <p className="text-muted">
                                        Add, update, view and
                                        delete student records.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-md-4">

                            <div className="card shadow-sm text-center h-100">

                                <div className="card-body">

                                    <div className="fs-1">
                                        🔍
                                    </div>

                                    <h5 className="mt-3">
                                        Search & Sort
                                    </h5>

                                    <p className="text-muted">
                                        Search students and sort
                                        records efficiently.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-md-4">

                            <div className="card shadow-sm text-center h-100">

                                <div className="card-body">

                                    <div className="fs-1">
                                        📊
                                    </div>

                                    <h5 className="mt-3">
                                        Dashboard
                                    </h5>

                                    <p className="text-muted">
                                        View useful student
                                        statistics and information.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;