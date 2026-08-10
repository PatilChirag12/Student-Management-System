package com.ibm.controller;

import java.util.List;

<<<<<<< Updated upstream
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
=======
import org.springframework.http.HttpStatus;
>>>>>>> Stashed changes
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.dto.StudentDTO;
import com.ibm.service.ExcelService;
import com.ibm.service.StudentService;

import jakarta.validation.Valid;

//This controller handles all the requests and response is sent in json form
@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {
	//Student service bean to handle logic
	StudentService service;
	ExcelService excelService;

	public StudentController(StudentService service, ExcelService excelService) {
		super();
		this.service = service;
		this.excelService = excelService;
	}
	
	
	//Insert student
	@PostMapping
	public ResponseEntity<StudentDTO> postStudent(@Valid @RequestBody StudentDTO dto) {

		return ResponseEntity.status(HttpStatus.CREATED)
				.body(service.postStudent(dto));
	}
	
	//Reads all students
	@GetMapping
	public ResponseEntity<List<StudentDTO>> getAllStudents(){
		return ResponseEntity.status(HttpStatus.OK)
				.body(service.getAllStudents());
	}
	
	//Retrives student with perticular id
	@GetMapping("/{id}")
	public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(service.getStudentById(id));
	}

	//Update existing student
	@PutMapping("/{id}")
	public ResponseEntity<StudentDTO> putStudent(@Valid @RequestBody StudentDTO dto ,@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(service.updateStudent(dto, id));
	}
	
	//Delete existing student
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.NO_CONTENT)
				.body(service.deleteStudent(id));
	}
	
	//Retrives student with perticular name
	@GetMapping("/search")
	public ResponseEntity<List<StudentDTO>> getStudentByName(@RequestParam String name) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(service.getStudentsByName(name));
	}
	
	//Retrives all students with mentioned course
	@GetMapping("/course/{course}")
	public ResponseEntity<List<StudentDTO>> getStudentsByCourse(@PathVariable String course){
		return ResponseEntity.status(HttpStatus.OK)
			   .body(service.getStudentsByCourse(course));
	}
	
	//Retrives list of sorted students byname in ascending order
	@GetMapping("/sort/name")
	public ResponseEntity<List<StudentDTO>> getSortedStudentsByName(){
		return ResponseEntity.status(HttpStatus.OK)
				.body(service.getSortedStudentsByName());
	}
	
	//Retrives list pf sorted students by date of joining from oldest to latest(ascending)
	@GetMapping("/sort/date")
	public ResponseEntity<List<StudentDTO>> getSortedStudentsByDate(){
		return ResponseEntity.status(HttpStatus.OK)
				.body( service.getSortedStudentsByDOJ());
<<<<<<< Updated upstream
	}
	
	@GetMapping("/excel")
	public ResponseEntity<InputStreamResource> getAllStudentsExcel(){
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=students.xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelService.exportAllStudents());
	}
	
	@GetMapping("/excel/name/{name}")
	public ResponseEntity<InputStreamResource> getAllStudentsExcelByName(@PathVariable String name){
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=students_with_name_"+name+".xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelService.exportAllStudentsByName(name));
	}
	
	@GetMapping("/excel/course/{course}")
	public ResponseEntity<InputStreamResource> getAllStudentsExcelByCourse(@PathVariable String course){
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=students_with_course_"+course+".xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelService.exportAllStudentsByCourse(course));
	}
	
	@GetMapping("/excel/sort/name")
	public ResponseEntity<InputStreamResource> getAllSortedStudentsByNameExcel(){
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=students_sorted_by_name.xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelService.exportAllSortedStudentsByName());
	}
	
	
	@GetMapping("/excel/sort/doj")
	public ResponseEntity<InputStreamResource> getAllSortedStudentsByDojExcel(){
		
		return ResponseEntity.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=students_sorted_by_doj.xlsx")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelService.exportAllSortedStudentsByDoj());
=======
>>>>>>> Stashed changes
	}
	
}