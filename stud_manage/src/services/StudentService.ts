    // import axios from "axios";
    // import type {Student} from "../models/Student";

    // const REST_API_BASE_URL = "http://localhost:8080/students";

    // export const getAllStudents = () => axios.get<Student[]>(REST_API_BASE_URL);

    // export const getStudentById = (id: number) =>
    //     axios.get<Student>(`${REST_API_BASE_URL}/${id}`);

    // export const createStudent = (student: Student) =>
    //     axios.post(REST_API_BASE_URL, student);

    // export const updateStudent = (id: number, student: Student) =>
    //     axios.put(`${REST_API_BASE_URL}/${id}`, student);

    // export const deleteStudent = (id: number) =>
    //     axios.delete(`${REST_API_BASE_URL}/${id}`);


    import axios from "axios";
import type { Student } from "../models/Student";

const API_URL = "http://localhost:8080/students";

/*
 * Get all students
 */
export const getAllStudents = () => {
    return axios.get<Student[]>(API_URL);
};

/*
 * Get student by ID
 */
export const getStudentById = (id: number) => {
    return axios.get<Student>(`${API_URL}/${id}`);
};

/*
 * Create student
 */
export const createStudent = (student: Omit<Student, "id">) => {
    return axios.post<Student>(API_URL, student);
};

/*
 * Update student
 */
export const updateStudent = (
    id: number,
    student: Omit<Student, "id">
) => {
    return axios.put<Student>(
        `${API_URL}/${id}`,
        student
    );
};

/*
 * Delete student
 */
export const deleteStudent = (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};

/*
 * Search students by name
 */
export const searchStudentsByName = (name: string) => {
    return axios.get<Student[]>(
        `${API_URL}/search`,
        {
            params: {
                name: name
            }
        }
    );
};

/*
 * Search students by course
 */
export const getStudentsByCourse = (course: string) => {
    return axios.get<Student[]>(
        `${API_URL}/course/${encodeURIComponent(course)}`
    );
};

/*
 * Sort students by name
 */
export const getStudentsSortedByName = () => {
    return axios.get<Student[]>(
        `${API_URL}/sort/name`
    );
};

/*
 * Sort students by date of joining
 */
export const getStudentsSortedByDate = () => {
    return axios.get<Student[]>(
        `${API_URL}/sort/date`
    );
};

/*
 * Download all students Excel
 */
export const downloadAllStudentsExcel = () => {
    return axios.get(
        `${API_URL}/excel`,
        {
            responseType: "blob"
        }
    );
};

/*
 * Download students by name Excel
 */
export const downloadStudentsByNameExcel = (
    name: string
) => {
    return axios.get(
        `${API_URL}/excel/name/${encodeURIComponent(name)}`,
        {
            responseType: "blob"
        }
    );
};

/*
 * Download students by course Excel
 */
export const downloadStudentsByCourseExcel = (
    course: string
) => {
    return axios.get(
        `${API_URL}/excel/course/${encodeURIComponent(course)}`,
        {
            responseType: "blob"
        }
    );
};

/*
 * Download students sorted by name Excel
 */
export const downloadStudentsSortedByNameExcel = () => {
    return axios.get(
        `${API_URL}/excel/sort/name`,
        {
            responseType: "blob"
        }
    );
};

export const getStudentCountByCourse = () => {
    return axios.get<Object[][]>(
        "http://localhost:8080/students/course/count"
    );
};
/*
 * Download students sorted by DOJ Excel
 */
export const downloadStudentsSortedByDateExcel = () => {
    return axios.get(
        `${API_URL}/excel/sort/doj`,
        {
            responseType: "blob"
        }
    );
};