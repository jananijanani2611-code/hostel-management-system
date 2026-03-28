package com.DBMS.HostelManagement.Controller;

import com.DBMS.HostelManagement.Dto.StudentDto;
import com.DBMS.HostelManagement.Service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class StudentController {

    private StudentService studentService;

    @PostMapping("/students")
    public String addStudent(@RequestBody StudentDto dto){
        return studentService.addStudent(dto);
    }

    @GetMapping("/students")
    public List<StudentDto> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/students/{id}")
    public StudentDto getStudentById(@PathVariable Long id){
        return studentService.getStudentById(id);
    }

    @DeleteMapping("/students/delete/{id}")
    public String deleteStudent(@PathVariable Long id){
        return studentService.deleteStudent(id);
    }

    @PostMapping("/students/update/{id}")
    public String updateStudent(@PathVariable Long id, @RequestBody StudentDto dto){
        return studentService.updateStudent(id, dto);
    }

    @PatchMapping("/students/feeStatus/{id}")
    public String toggleFeeStatus(@PathVariable Long id){
        return studentService.toggleFeeStatus(id);
    }
}