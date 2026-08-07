package com.ibm.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.core.io.InputStreamResource;

import com.ibm.dto.StudentDTO;

public interface ExcelService {
	public ByteArrayInputStream exportExcel(List<StudentDTO> students) throws IOException;
	
	public InputStreamResource exportAllStudents();
	
	public InputStreamResource exportAllStudentsByName(String name);
	
	public InputStreamResource exportAllStudentsByCourse(String course);
	
	 public InputStreamResource exportAllSortedStudentsByName();
	 
	 public InputStreamResource exportAllSortedStudentsByDoj();
}
