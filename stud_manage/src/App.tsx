// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import AddStudent from "./pages/AddStudent";
// import About from "./pages/About";
// import ViewStudent from "./pages/ViewStudent";
// import StudentList from "./pages/StudentList";

// import "./styles/Navbar.css";

// function App() {

//     // Light/Dark mode state
//     const [darkMode, setDarkMode] = useState(false);

//     // Function to toggle the theme
//     const toggleDarkMode = () => {
//         setDarkMode(!darkMode);
//     };

//     return (
//         <div className={darkMode ? "app dark-mode" : "app light-mode"}>

//             {/* Navbar */}
//             <Navbar
//                 darkMode={darkMode}
//                 toggleDarkMode={toggleDarkMode}
//             />

//             {/* Pages */}
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/add-student" element={<AddStudent />} />
//                 <Route path="/view-student/:id" element={<ViewStudent />} />
//                 <Route path="/students" element={<StudentList />} />
//             </Routes>

//         </div>
//     );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ViewStudent from "./pages/ViewStudent";
import About from "./pages/About";

import "./styles/Navbar.css";
import "./styles/theme.css";

function App() {

    return (
        <div className="d-flex flex-column min-vh-100">

            <Navbar />

            <main className="flex-grow-1">

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/students"
                        element={<StudentList />}
                    />

                    <Route
                        path="/add-student"
                        element={<AddStudent />}
                    />

                    <Route
                        path="/view-student/:id"
                        element={<ViewStudent />}
                    />

                    <Route
                        path="/edit-student/:id"
                        element={<EditStudent />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                </Routes>

            </main>

            <Footer />

        </div>
    );
}

export default App;