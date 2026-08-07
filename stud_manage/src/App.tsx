import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import About from "./pages/About";
import "./styles/Navbar.css";
// import StudentList from "./pages/StudentList"

function App() {
  return (
    <>
      <h1>Student Management System</h1>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;