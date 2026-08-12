package com.ibm.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.ibm.dto.StudentDTO;
import com.ibm.entity.Student;
import com.ibm.exception.InvalidDojException;
import com.ibm.exception.InvalidStudentException;
import com.ibm.exception.StudentNotFoundException;
import com.ibm.repository.StudentRepository;

//Implementation of service interface
@Service
public class StudentServiceImpl implements StudentService{
	
	//modelmapper and repository beans
	private ModelMapper mapper;
	private StudentRepository repository;
	
	
	

	public StudentServiceImpl(ModelMapper mapper, StudentRepository repository) {
		super();
		this.mapper = mapper;
		this.repository = repository;
	}

	//Create student logic
	@Override
	public StudentDTO postStudent(StudentDTO dto) {
		//Date of joining Exception handling
	    if (dto.getDateOfJoining().after(new Date())) {
	        throw new InvalidDojException(
	            "Date of joining cannot be a future date"
	        );
	       }
	    
		Student student = mapper.map(dto, Student.class);
		student = repository.save(student);
		return mapper.map(student, StudentDTO.class);
	}

	//Read all students
	public List<StudentDTO> getAllStudents() {
	    List<StudentDTO> dtoList = new ArrayList<>();

	    for (Student student : repository.findAll()) {
	        dtoList.add(mapper.map(student, StudentDTO.class));
	    }

	    return dtoList;
	}

	//uUpdate Existing student
	@Override
	public StudentDTO updateStudent(StudentDTO dto, Long id) {
		//Avoids creating a new student entry with diffrent id
		Student student =repository.findById(id)
        .orElseThrow(() -> new StudentNotFoundException("Student witn ID:"+id+" does not exist!"));
		
	    if (dto.getDateOfJoining().after(new Date())) {
	        throw new InvalidDojException(
	            "Date of joining cannot be a future date"
	        );
	       }
	    
	    if (repository.existsByEmail(dto.getEmail())) {
	        throw new InvalidStudentException("Email already exists");
	    }

	    if (repository.existsByMobile(dto.getMobile())) {
	        throw new InvalidStudentException("Mobile number already exists");
	    }
	    
			//Sets the student bean fields instead of making an identical student object by mapper
			//This is to avoid identical object creation while updating
			student.setAddress(dto.getAddress());
			student.setCourse(dto.getCourse());
			student.setDateOfJoining(dto.getDateOfJoining());
			student.setEmail(dto.getEmail());
			student.setGender(dto.getGender());
			student.setMobile(dto.getMobile());
			student.setName(dto.getName());
			student = repository.save(student);
			dto = mapper.map(student, StudentDTO.class);

		return dto;
	}

	//Get student by id
	@Override
	public StudentDTO getStudentById(Long id) {
		Student student = repository.findById(id)
		        .orElseThrow(() -> new StudentNotFoundException("Student witn ID:"+id+" does not exist!"));

		return mapper.map(student, StudentDTO.class);
	}

	//Delete Student
	@Override
	public String deleteStudent(Long id) {
		//checks wheather student exists or not
		repository.findById(id).orElseThrow(()-> new StudentNotFoundException("Student witn ID:"+id+" does not exist!"));
		
		repository.deleteById(id);;
		 

		return "Student with ID:"+id+" deleted successfully!";
	}

	//Get students by name
	//Students with same name are retrived as a list because name is not unique
	@Override
	public List<StudentDTO> getStudentsByName(String name) {
		
		List<Student> students = repository.findAllByName(name)
        .orElseThrow(() -> new StudentNotFoundException("Student not found"));

		ArrayList<StudentDTO> dtoList = new ArrayList<StudentDTO>();
		StudentDTO dto;
		
		for (Student student : students) {
			dto = mapper.map(student, StudentDTO.class);
			dtoList.add(dto);
		}
		
		return dtoList;
	}

	//retrieves all the students with same course
	@Override
	public List<StudentDTO> getStudentsByCourse(String course) {
	    List<Student> students = repository.findAllByCourse(course);

	    if (students.isEmpty()) {
	        throw new StudentNotFoundException(
	            "No students found for course " + course
	        );
	    }

	    List<StudentDTO> dtoList = new ArrayList<>();

	    for (Student student : students) {
	        StudentDTO dto = mapper.map(student, StudentDTO.class);
	        dtoList.add(dto);
	    }

	    return dtoList;
	}

	//retrives all students in ascending order of their name
	@Override
	public List<StudentDTO> getSortedStudentsByName() {
		List<StudentDTO> dtoList = new ArrayList<StudentDTO>();
		StudentDTO dto;
		
		
		for (Student student : repository.findAllSortedStudentsByName()) {
			dto = mapper.map(student, StudentDTO.class);
			dtoList.add(dto);
		}
		
		return dtoList;
	}

	//retives all the students with ascending order of joining
	@Override
	public List<StudentDTO> getSortedStudentsByDOJ() {
		List<StudentDTO> dtoList = new ArrayList<StudentDTO>();
		StudentDTO dto;
		
		
		for (Student student : repository.findAllSortedStudentsByDOJ()) {
			dto = mapper.map(student, StudentDTO.class);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	public List<Object[]> getStudentCountByCourse() {
	    return repository.countStudentsByCourse();
	}
}