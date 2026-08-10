import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import About from "./pages/About";
import "./styles/Navbar.css";
// import StudentList from "./pages/StudentList"
import ViewStudent from "./pages/ViewStudent"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/view-student/:id" element={<ViewStudent />}
        />
      </Routes>
    </>
  );
}

export default App;