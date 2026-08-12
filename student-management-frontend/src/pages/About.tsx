// function About() {
//     return (
//         /* The outer div handles full page centering for everything inside it */
//         <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100vw',
//             textAlign: 'center',
//             padding: '20px'
//         }}>
//             <h2>About</h2>
//             <p className="lead mt-3" style={{ maxWidth: '600px' }}>
//                 This Student Management System is built via 
//                 React, Spring Boot, REST APIs, MySQL, Axios and
//                 Bootstrap.
//             </p>
//         </div>
//     );
// }

// export default About;

function About() {

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-lg-9">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white text-center">

                            <h2 className="mb-0">
                                About Student Management System
                            </h2>

                        </div>


                        <div className="card-body p-4">

                            <section className="mb-4">

                                <h4>
                                    Project Overview
                                </h4>

                                <p>
                                    The Student Management System
                                    is a full-stack web application
                                    designed to manage student
                                    information efficiently.
                                </p>

                                <p>
                                    Administrators can add,
                                    view, update, delete, search,
                                    sort and manage student
                                    records through a responsive
                                    web interface.
                                </p>

                            </section>


                            <hr />


                            <section className="mb-4">

                                <h4>
                                    Technology Stack
                                </h4>

                                <div className="row g-3 mt-2">

                                    <div className="col-12 col-sm-6">

                                        <div className="border rounded p-3 h-100">

                                            <h5>
                                                Frontend
                                            </h5>

                                            <ul className="mb-0">

                                                <li>
                                                    React
                                                </li>

                                                <li>
                                                    Vite
                                                </li>

                                                <li>
                                                    TypeScript
                                                </li>

                                                <li>
                                                    React Router
                                                </li>

                                                <li>
                                                    Axios
                                                </li>

                                                <li>
                                                    Bootstrap
                                                </li>

                                            </ul>

                                        </div>

                                    </div>


                                    <div className="col-12 col-sm-6">

                                        <div className="border rounded p-3 h-100">

                                            <h5>
                                                Backend
                                            </h5>

                                            <ul className="mb-0">

                                                <li>
                                                    Java
                                                </li>

                                                <li>
                                                    Spring Boot
                                                </li>

                                                <li>
                                                    Spring Data JPA
                                                </li>

                                                <li>
                                                    Hibernate
                                                </li>

                                                <li>
                                                    REST APIs
                                                </li>

                                                <li>
                                                    Maven
                                                </li>

                                            </ul>

                                        </div>

                                    </div>


                                    <div className="col-12">

                                        <div className="border rounded p-3">

                                            <h5>
                                                Database
                                            </h5>

                                            <p className="mb-0">
                                                MySQL
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </section>


                            <hr />


                            <section className="mb-4">

                                <h4>
                                    Main Features
                                </h4>

                                <div className="row g-2 mt-2">

                                    <div className="col-12 col-md-6">

                                        <ul>

                                            <li>
                                                Student CRUD operations
                                            </li>

                                            <li>
                                                Student search
                                            </li>

                                            <li>
                                                Course search
                                            </li>

                                            <li>
                                                Sorting
                                            </li>

                                        </ul>

                                    </div>


                                    <div className="col-12 col-md-6">

                                        <ul>

                                            <li>
                                                Pagination
                                            </li>

                                            <li>
                                                Form validation
                                            </li>

                                            <li>
                                                Excel export
                                            </li>

                                            <li>
                                                Responsive UI
                                            </li>

                                        </ul>

                                    </div>

                                </div>

                            </section>


                            <hr />


                            <section>

                                <h4>
                                    Student Information
                                </h4>

                                <p>
                                    Each student record contains:
                                </p>

                                <div className="table-responsive">

                                    <table className="table table-bordered">

                                        <thead className="table-dark">

                                            <tr>

                                                <th>
                                                    Field
                                                </th>

                                                <th>
                                                    Description
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            <tr>
                                                <td>ID</td>
                                                <td>Automatically generated student ID</td>
                                            </tr>

                                            <tr>
                                                <td>Name</td>
                                                <td>Student name</td>
                                            </tr>

                                            <tr>
                                                <td>Email</td>
                                                <td>Student email address</td>
                                            </tr>

                                            <tr>
                                                <td>Mobile</td>
                                                <td>10-digit mobile number</td>
                                            </tr>

                                            <tr>
                                                <td>Course</td>
                                                <td>Student's course</td>
                                            </tr>

                                            <tr>
                                                <td>Address</td>
                                                <td>Student address</td>
                                            </tr>

                                            <tr>
                                                <td>Gender</td>
                                                <td>Student gender</td>
                                            </tr>

                                            <tr>
                                                <td>Date Of Joining</td>
                                                <td>Student joining date</td>
                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </section>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default About;