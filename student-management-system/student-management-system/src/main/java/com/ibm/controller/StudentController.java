package com.ibm.controller;

import java.util.List;

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
import com.ibm.service.StudentService;

import jakarta.validation.Valid;

//This controller handles all the requests and response is sent in json form
@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {
	//Student service bean to handle logic
	StudentService service;

	public StudentController(StudentService service) {
		super();
		this.service = service;
	}
	
	
	//Insert student
	@PostMapping
	public StudentDTO postStudent(@Valid @RequestBody StudentDTO dto) {

		return service.postStudent(dto);
	}
	
	//Reads all students
	@GetMapping
	public List<StudentDTO> getAllStudents(){
		return service.getAllStudents();
	}
	
	//Retrives student with perticular id
	@GetMapping("/{id}")
	public StudentDTO getStudentById(@PathVariable Long id) {
		return service.getStudentById(id);
	}

	//Update existing student
	@PutMapping("/{id}")
	public StudentDTO putStudent(@Valid @RequestBody StudentDTO dto ,@PathVariable Long id) {
		return service.updateStudent(dto, id);
	}
	
	//Delete existing student
	@DeleteMapping("/{id}")
	public String deleteStudent(@PathVariable Long id) {
		return service.deleteStudent(id);
	}
	
	//Retrives student with perticular name
	@GetMapping("/search")
	public List<StudentDTO> getStudentByName(@RequestParam String name) {
		return service.getStudentsByName(name);
	}
	
	//Retrives all students with mentioned course
	@GetMapping("/course/{course}")
	public List<StudentDTO> getStudentsByCourse(@PathVariable String course){
		return service.getStudentsByCourse(course);
	}
	
	//Retrives list of sorted students byname in ascending order
	@GetMapping("/sort/name")
	public List<StudentDTO> getSortedStudentsByName(){
		return service.getSortedStudentsByName();
	}
	
	//Retrives list pf sorted students by date of joining from oldest to latest(ascending)
	@GetMapping("/sort/date")
	public List<StudentDTO> getSortedStudentsByDate(){
		return service.getSortedStudentsByDOJ();
	}
	
}
