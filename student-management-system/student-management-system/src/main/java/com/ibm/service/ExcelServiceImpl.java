package com.ibm.service;


import com.ibm.dto.StudentDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelServiceImpl implements ExcelService{

    private static final String SHEET_NAME = "Students";
    private static final String[] HEADERS = {
            "ID",
            "Name",
            "Email",
            "Mobile",
            "Course",
            "Address",
            "Gender",
            "Date Of Joining"
    };

    private StudentService service;
    
    
    public ExcelServiceImpl(StudentService service) {
		super();
		this.service = service;
	}

    @Override
	public ByteArrayInputStream exportExcel(List<StudentDTO> students) throws IOException {
    	
    	//Excel sheet config
        Workbook workbook = new XSSFWorkbook();
        
        Sheet sheet = workbook.createSheet(SHEET_NAME);

        
        // Header style
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        // Reversing date style from yyyy-mm-dd to dd-mm-yyyy
        CellStyle dateStyle = workbook.createCellStyle();
        
        CreationHelper creationHelper = workbook.getCreationHelper();
        dateStyle.setDataFormat(creationHelper.createDataFormat().getFormat("dd-MM-yyyy"));

        // Header row
        Row headerRow = sheet.createRow(0);

        for (int i = 0; i < HEADERS.length; i++) {
        	
            Cell cell = headerRow.createCell(i);
            
            cell.setCellValue(HEADERS[i]);
            cell.setCellStyle(headerStyle);
        
        
        
        }

        // Data rows
        int rowNum = 1;

        for (StudentDTO student : students) {

            Row row = sheet.createRow(rowNum++);

            row.createCell(0).setCellValue(student.getId() != null ? student.getId() : 0);
            
            
            row.createCell(1).setCellValue(student.getName() != null? student.getName() : "");

            row.createCell(2).setCellValue(student.getEmail() != null? student.getEmail() : "");

            
            row.createCell(3).setCellValue(student.getMobile() != null? student.getMobile() : "");

            row.createCell(4).setCellValue(student.getCourse() != null? student.getCourse() : "");

            row.createCell(5).setCellValue(student.getAddress() != null? student.getAddress() : "");

            row.createCell(6).setCellValue(student.getGender() != null? student.getGender() : "");
            
            
            

            Cell dateCell = row.createCell(7);
            if (student.getDateOfJoining() != null) {
            	
                dateCell.setCellValue(student.getDateOfJoining());
                dateCell.setCellStyle(dateStyle);
                
                
            }
        }

       
        for (int i = 0; i < HEADERS.length; i++) {
            sheet.autoSizeColumn(i);
        }

        
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        
        
        return new ByteArrayInputStream(out.toByteArray());
    }
    
    @Override
    public InputStreamResource exportAllStudents() {

        ByteArrayInputStream excelFile = null;
        
        try {
			excelFile = exportExcel(service.getAllStudents());
		} catch (IOException e) {
			System.out.println("Unexpected Error Occured");
		}

        return new InputStreamResource(excelFile);
    }
    
    @Override
    public InputStreamResource exportAllStudentsByName(String name) {

        ByteArrayInputStream excelFile = null;
        
        try {
			excelFile = exportExcel(service.getStudentsByName(name));
		} catch (IOException e) {
			System.out.println("Unexpected Error Occured");
		}

        return new InputStreamResource(excelFile);
    }
    
    @Override
    public InputStreamResource exportAllStudentsByCourse(String course) {

        ByteArrayInputStream excelFile = null;
        
        try {
			excelFile = exportExcel(service.getStudentsByCourse(course));
		} catch (IOException e) {
			System.out.println("Unexpected Error Occured");
		}

        return new InputStreamResource(excelFile);
    }
    
    @Override
    public InputStreamResource exportAllSortedStudentsByName() {

        ByteArrayInputStream excelFile = null;
        
        try {
			excelFile = exportExcel(service.getSortedStudentsByName());
		} catch (IOException e) {
			System.out.println("Unexpected Error Occured");
		}

        return new InputStreamResource(excelFile);
    }
    
    @Override
    public InputStreamResource exportAllSortedStudentsByDoj() {

        ByteArrayInputStream excelFile = null;
        
        try {
			excelFile = exportExcel(service.getSortedStudentsByDOJ());
		} catch (IOException e) {
			System.out.println("Unexpected Error Occured");
		}

        return new InputStreamResource(excelFile);
    }


    
}
