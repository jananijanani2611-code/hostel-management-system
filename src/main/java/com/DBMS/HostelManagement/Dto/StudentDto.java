package com.DBMS.HostelManagement.Dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {

    private Long id;
    private String studentName;
    private String roomNumber;
    private String contactNumber;
    private String course;
    private String feeStatus;
}