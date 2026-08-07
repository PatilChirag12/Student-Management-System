    import axios from "axios";
    import type {Student} from "../models/Student";

    const REST_API_BASE_URL = "http://localhost:8080/students";

    export const getAllStudents = () => axios.get<Student[]>(REST_API_BASE_URL);

    export const getStudentById = (id: number) =>
        axios.get<Student>(`${REST_API_BASE_URL}/${id}`);

    export const createStudent = (student: Student) =>
        axios.post(REST_API_BASE_URL, student);

    export const updateStudent = (id: number, student: Student) =>
        axios.put(`${REST_API_BASE_URL}/${id}`, student);

    export const deleteStudent = (id: number) =>
        axios.delete(`${REST_API_BASE_URL}/${id}`);