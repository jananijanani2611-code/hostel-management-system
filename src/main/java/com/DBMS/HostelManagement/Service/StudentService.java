package com.DBMS.HostelManagement.Service;

import com.DBMS.HostelManagement.Dto.StudentDto;
import com.DBMS.HostelManagement.Entity.StudentEntity;
import com.DBMS.HostelManagement.Repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository studentRepository;
    private ModelMapper modelMapper;

    // ADD STUDENT
    public String addStudent(StudentDto studentDto){
        studentRepository.save(modelMapper.map(studentDto, StudentEntity.class));
        return "Student Added Successfully";
    }

    public List<StudentDto> getAllStudents(){
        List<StudentEntity> allStudents = studentRepository.findAll();
        return allStudents.stream()
                .map((student) -> modelMapper.map(student, StudentDto.class))
                .collect(Collectors.toList());
    }


    public StudentDto getStudentById(Long id){
        StudentEntity foundStudent = studentRepository.findById(id).get();
        return modelMapper.map(foundStudent, StudentDto.class);
    }


    public String deleteStudent(Long id){
        studentRepository.deleteById(id);
        return "Student Deleted Successfully";
    }


    public String updateStudent(Long id, StudentDto studentDto){
        StudentEntity foundStudent = studentRepository.findById(id).get();
        foundStudent.setStudentName(studentDto.getStudentName());
        foundStudent.setRoomNumber(studentDto.getRoomNumber());
        foundStudent.setContactNumber(studentDto.getContactNumber());
        foundStudent.setCourse(studentDto.getCourse());
        foundStudent.setFeeStatus(studentDto.getFeeStatus());
        studentRepository.save(foundStudent);
        return "Student Updated Successfully";
    }

    public String toggleFeeStatus(Long id){
        StudentEntity foundStudent = studentRepository.findById(id).get();
        if(foundStudent.getFeeStatus().equals("Paid")){
            foundStudent.setFeeStatus("Pending");
        } else {
            foundStudent.setFeeStatus("Paid");
        }
        studentRepository.save(foundStudent);
        return "Fee Status Updated";
    }
}