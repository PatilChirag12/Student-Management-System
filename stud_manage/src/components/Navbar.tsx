// import { NavLink } from "react-router-dom";

// interface NavbarProps {
//     darkMode: boolean;
//     toggleDarkMode: () => void;
// }

// function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {

//     return (
//         <nav
//             className={
//                 darkMode
//                     ? "navbar navbar-expand-lg navbar-dark bg-dark"
//                     : "navbar navbar-expand-lg navbar-light bg-light"
//             }
//         >

//             <div className="container">

//                 {/* Website Name */}
//                 <NavLink className="navbar-brand" to="/">
//                     Student Management System
//                 </NavLink>

//                 {/* Mobile Menu Button */}
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 {/* Navigation Links */}
//                 <div
//                     className="collapse navbar-collapse"
//                     id="navbarNav"
//                 >

//                     <ul className="navbar-nav ms-auto">

//                         <li className="nav-item">
//                             <NavLink
//                                 className="nav-link"
//                                 to="/"
//                             >
//                                 Home
//                             </NavLink>
//                         </li>

//                         <li className="nav-item">
//                             <NavLink
//                                 className="nav-link"
//                                 to="/students"
//                             >
//                                 Students
//                             </NavLink>
//                         </li>

//                         <li className="nav-item">
//                             <NavLink
//                                 className="nav-link"
//                                 to="/add-student"
//                             >
//                                 Add Student
//                             </NavLink>
//                         </li>

//                         <li className="nav-item">
//                             <NavLink
//                                 className="nav-link"
//                                 to="/about"
//                             >
//                                 About
//                             </NavLink>
//                         </li>

//                         {/* Dark Mode Toggle */}
//                         <li className="nav-item theme-toggle-item">

//                             <button
//                                 className="theme-toggle"
//                                 onClick={toggleDarkMode}
//                                 type="button"
//                             >
//                                 {darkMode ? "☀️ Light" : "🌙 Dark"}
//                             </button>

//                         </li>

//                     </ul>

//                 </div>

//             </div>

//         </nav>
//     );
// }


// export default Navbar;
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {

    const {
        darkMode,
        toggleDarkMode
    } = useTheme();

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">

            <div className="container-fluid">

                <NavLink
                    to="/"
                    className="navbar-brand"
                >
                    Student Management System
                </NavLink>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/dashboard"
                                className="nav-link"
                            >
                                Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/students"
                                className="nav-link"
                            >
                                Students
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/add-student"
                                className="nav-link"
                            >
                                Add Student
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className="nav-link"
                            >
                                About
                            </NavLink>
                        </li>

                    </ul>


                    <button
                        type="button"
                        className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0"
                        onClick={
                            toggleDarkMode
                        }
                    >
                        {darkMode
                            ? "☀️ Light"
                            : "🌙 Dark"}
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;