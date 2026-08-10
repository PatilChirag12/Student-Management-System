package com.ibm.service;

import java.util.List;

import com.ibm.dto.StudentDTO;

//Service interface
public interface StudentService {
	public StudentDTO postStudent(StudentDTO dto);
	
	public List<StudentDTO> getAllStudents();
	
	public StudentDTO updateStudent(StudentDTO dto, Long id);
	
	public StudentDTO getStudentById(Long id);
	
	public String deleteStudent(Long id);
	
	public List<StudentDTO> getStudentsByName(String name);
	
	public List<StudentDTO> getStudentsByCourse(String course);
	
	public List<StudentDTO> getSortedStudentsByName();
	
	public List<StudentDTO> getSortedStudentsByDOJ();
	
	public List<Object[]> getStudentCountByCourse();
	
}