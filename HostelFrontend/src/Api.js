import axios from 'axios';

// Set VITE_API_BASE_URL in a .env file (or in your Vercel project's
// environment variables) to point at your deployed backend.
// Falls back to localhost for local development.
const Base_Url = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080') + '/students'

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