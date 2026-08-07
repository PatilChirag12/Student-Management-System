package com.ibm.exception;

//Custom exception declaration
public class InvalidDojException extends RuntimeException{

	public InvalidDojException(String message) {
		super(message);
	}

}
