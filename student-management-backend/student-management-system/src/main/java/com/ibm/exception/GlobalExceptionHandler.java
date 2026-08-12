package com.ibm.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;


//Exception Handeler
@RestControllerAdvice
public class GlobalExceptionHandler {

    //Handles StudenetNotFoundException and uses custom Error response
	@ExceptionHandler(StudentNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleStudentNotFoundException(StudentNotFoundException ex,HttpServletRequest req){
		ErrorResponse resp = new ErrorResponse(LocalDateTime.now(),
				HttpStatus.NOT_FOUND.value(),
				HttpStatus.NOT_FOUND.getReasonPhrase(),
				ex.getMessage(),
				req.getRequestURI());
		return new ResponseEntity<ErrorResponse>(resp,HttpStatus.NOT_FOUND);
	}
	
	//Handles InvalidBojException and also uses custom Error Response
	@ExceptionHandler(InvalidDojException.class)
	public ResponseEntity<ErrorResponse> handleInvalidDojException(InvalidDojException ex,HttpServletRequest req){
		ErrorResponse resp = new ErrorResponse(LocalDateTime.now(),
				HttpStatus.NOT_FOUND.value(),
				HttpStatus.NOT_FOUND.getReasonPhrase(),
				ex.getMessage(),
				req.getRequestURI());
		return new ResponseEntity<ErrorResponse>(resp,HttpStatus.NOT_FOUND);
	}
	
    //Handles constraint violations by using existing exception class
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String,String>> handleConstraintViolation(
            ConstraintViolationException ex) {


        Map<String,String> errors = new HashMap<>();


        ex.getConstraintViolations()
          .forEach(violation -> {
              String fieldName =
                    violation.getPropertyPath().toString();
              String message =
                    violation.getMessage();
              errors.put(fieldName, message);
          });


        return new ResponseEntity<>(
                errors,
                HttpStatus.BAD_REQUEST
        );
    }
    
    //Handles data integrity violations by handling existing exception
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDuplicate(
            DataIntegrityViolationException ex) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Duplicate value already exists");
    }
    
  //Handles insertion or updation of duplicate unique fields
	@ExceptionHandler(InvalidStudentException.class)
	public ResponseEntity<ErrorResponse> handleInvalidStudentException(InvalidStudentException ex,HttpServletRequest req){
		ErrorResponse resp = new ErrorResponse(LocalDateTime.now(),
				HttpStatus.NOT_FOUND.value(),
				HttpStatus.NOT_FOUND.getReasonPhrase(),
				ex.getMessage(),
				req.getRequestURI());
		return new ResponseEntity<ErrorResponse>(resp,HttpStatus.NOT_FOUND);
	}
}
