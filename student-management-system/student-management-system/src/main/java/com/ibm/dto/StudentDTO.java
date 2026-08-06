package com.ibm.dto;

import java.util.Date;


public class StudentDTO {

	private Long id;
	private String name;
	private String email;
	private String mobile;
	private String course;
	private String address;
	private String gender;
	private Date dateOfJoining;
	
	
	
	
	public StudentDTO() {
		super();
	}
	public StudentDTO(String name, String email, String mobile, String course, String address, String gender,
			Date dateOfJoining) {
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
