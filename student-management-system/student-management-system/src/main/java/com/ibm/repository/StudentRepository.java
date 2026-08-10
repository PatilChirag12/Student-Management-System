package com.ibm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ibm.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

//Hibernate implemented abstract methods
	public Optional<List<Student>> findAllByName(String name);
	
	public Boolean existsByName(String name);
	
	public Boolean existsByCourse(String course);
	
	public List<Student> findAllByCourse(String course);
	
	public Optional<Student> findByCourse(String course);
	
//Custom sql queries for service
	@Query("select s from Student s order by s.name  ASC")
	public List<Student> findAllSortedStudentsByName();
	
	@Query("select s from Student s order by s.dateOfJoining ASC")
	public List<Student> findAllSortedStudentsByDOJ();
	
	@Query("select s.course, count(s) FROM Student s group by s.course")
	List<Object[]> countStudentsByCourse();

}
