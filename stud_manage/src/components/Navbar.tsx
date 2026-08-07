import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <NavLink className="navbar-brand" to="/">
                    Student Management System
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/students"
                            >
                                Students
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/add-student"
                            >
                                Add Student
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;