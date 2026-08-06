package com.ibm.entity;

import java.time.LocalDate;
import java.util.Date;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank(message = "Name is required!")
	@Size(min = 1, max= 50, message = "Name must contain 1 to 50 characters")
	private String name;
	
	
	@NotBlank(message = "Email is required!")
	@Email(message = "Email must be valid")
	@Column(nullable = false)
	private String email;
	
	
	@NotBlank(message = "Mobile Number is required!")
	@Pattern(
			regexp = "^[0-9]{10}$", message = "Mobile number must contain 10 digits!"
			)
	private String mobile;
	
	@NotBlank(message = "Course is required!")
	private String course;
	
	@NotBlank(message = "Address is required!")
	private String address;
	
	@NotBlank(message = "Please select the gender")
	private String gender;
	
	@PastOrPresent(message = "DOJ must not be a future date")
	private Date dateOfJoining;

	
	
	
	
	public Student() {
		super();
	}

	public Student(
			@NotBlank(message = "Name is required!") @Size(min = 1, max = 50, message = "Name must contain 1 to 50 characters") String name,
			@NotBlank(message = "Email is required!") @Email(message = "Email must be valid") String email,
			@NotBlank(message = "Mobile Number is required!") @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must contain 10 digits!") String mobile,
			@NotBlank(message = "Course is required!") String course,
			@NotBlank(message = "Address is required!") String address,
			@NotBlank(message = "Please select the gender") String gender,
			@PastOrPresent(message = "DOJ must not be a future date") Date dateOfJoining) {
		super();
		this.name = name;
		this.email = email;
		this.mobile = mobile;
		this.course = course;
		this.address = address;
		this.gender = gender;
		this.dateOfJoining = dateOfJoining;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(Date dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}
	
	
	
}
