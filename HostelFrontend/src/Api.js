import axios from 'axios';

const Base_Url = 'http://localhost:8080/students'

export function AddStudent(student){
    return(axios.post(Base_Url, student))
}

export function GetAllStudents(){
    return(axios.get(Base_Url))
}

export function DeleteStudent(id){
    return(axios.delete(Base_Url + '/delete/' + id))
}

export function ToggleFeeStatus(id){
    return(axios.patch(Base_Url + '/feeStatus/' + id))
}

export function getStudentById(id){
    return(axios.get(Base_Url + '/' + id))
}

export function updateStudent(id, updated){
    return(axios.post(Base_Url + '/update/' + id, updated))
}