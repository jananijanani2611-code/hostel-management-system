import React from 'react'
import { AddStudent, ToggleFeeStatus, DeleteStudent, 
  GetAllStudents, getStudentById, updateStudent } from './Api'

function App() {
  const [id, setId] = React.useState()
  const [newStudent, setNewStudent] = React.useState({
    studentName: '',
    roomNumber: '',
    contactNumber: '',
    course: '',
    feeStatus: 'Pending'
  })
  const [Students, setStudents] = React.useState([])

  function loadStudents() {
    GetAllStudents().then(res => { setStudents(res.data) })
  }

  React.useEffect(() => {
    loadStudents()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setNewStudent((prev) => {
      return ({ ...prev, [name]: value })
    })
  }

  function handleSubmit(newStudentData) {
    AddStudent(newStudentData).then(res => {
      setNewStudent({
        studentName: '',
        roomNumber: '',
        contactNumber: '',
        course: '',
        feeStatus: 'Pending'
      })
      loadStudents()
    })
  }

  function handleDelete(id) {
    DeleteStudent(id).then(res => {
      loadStudents()
    })
  }

  function handleToggleFee(id) {
    ToggleFeeStatus(id).then(res => {
      loadStudents()
    })
  }

  function handleUpdate(id) {
    getStudentById(id).then(res => {
      setNewStudent(res.data)
      setId(id)
    })
  }

  function handleUpdateSubmission(id, updated) {
    updateStudent(id, updated).then(res => {
      setNewStudent({
        studentName: '',
        roomNumber: '',
        contactNumber: '',
        course: '',
        feeStatus: 'Pending'
      })
      setId()
      loadStudents()
    })
  }

  const tableData = Students.map((student) => {
    return (
      <tr key={student.id || student.studentName}>
        <td>{student.id}</td>
        <td>{student.studentName}</td>
        <td>{student.roomNumber}</td>
        <td>{student.contactNumber}</td>
        <td>{student.course}</td>
        <td>{student.feeStatus}</td>
        <td>
          <div className='d-flex'>
            <button onClick={() => handleDelete(student.id)}
              className='btn btn-danger me-2 btn-sm'>Delete</button>
            <button onClick={() => handleToggleFee(student.id)}
              className='btn btn-success me-2 btn-sm'>Toggle Fee</button>
            <button onClick={() => handleUpdate(student.id)}
              className='btn btn-primary me-2 btn-sm'>Edit</button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      <div className='bg-dark text-white text-center p-3 mb-4'>
        <h2>Hostel Management System</h2>
      </div>

      <div className="container d-flex justify-content-around p-3">
        {!id ? <div className="card p-4" style={{width:'600px'}}>
          <h4 className='fw-bolder text-center mb-4'>Add Student</h4>
          <label className='fw-bold'>Student Name</label>
          <input value={newStudent.studentName} onChange={handleChange}
            name='studentName' type="text" className='form-control mb-2'
            placeholder='Enter Student Name' />
          <label className='fw-bold'>Room Number</label>
          <input value={newStudent.roomNumber} onChange={handleChange}
            name='roomNumber' type="text" className='form-control mb-2'
            placeholder='Enter Room Number' />
          <label className='fw-bold'>Contact Number</label>
          <input value={newStudent.contactNumber} onChange={handleChange}
            name='contactNumber' type="text" className='form-control mb-2'
            placeholder='Enter Contact Number' />
          <label className='fw-bold'>Course</label>
          <input value={newStudent.course} onChange={handleChange}
            name='course' type="text" className='form-control mb-2'
            placeholder='Enter Course' />
          <label className='fw-bold'>Fee Status</label>
          <select value={newStudent.feeStatus} onChange={handleChange}
            name='feeStatus' className='form-control mb-3'>
            <option>Pending</option>
            <option>Paid</option>
          </select>
          <button onClick={() => handleSubmit(newStudent)}
            className='btn btn-primary btn-sm mt-2'>Add Student</button>
        </div> : ''}

        {id ? <div className="card p-4" style={{width:'600px'}}>
          <h4 className='fw-bolder text-center mb-4'>Update Student</h4>
          <label className='fw-bold'>Student Name</label>
          <input value={newStudent.studentName} onChange={handleChange}
            name='studentName' type="text" className='form-control mb-2'
            placeholder='Enter Student Name' />
          <label className='fw-bold'>Room Number</label>
          <input value={newStudent.roomNumber} onChange={handleChange}
            name='roomNumber' type="text" className='form-control mb-2'
            placeholder='Enter Room Number' />
          <label className='fw-bold'>Contact Number</label>
          <input value={newStudent.contactNumber} onChange={handleChange}
            name='contactNumber' type="text" className='form-control mb-2'
            placeholder='Enter Contact Number' />
          <label className='fw-bold'>Course</label>
          <input value={newStudent.course} onChange={handleChange}
            name='course' type="text" className='form-control mb-2'
            placeholder='Enter Course' />
          <label className='fw-bold'>Fee Status</label>
          <select value={newStudent.feeStatus} onChange={handleChange}
            name='feeStatus' className='form-control mb-3'>
            <option>Pending</option>
            <option>Paid</option>
          </select>
          <button onClick={() => handleUpdateSubmission(id, newStudent)}
            className='btn btn-warning btn-sm mt-2'>Update Student</button>
        </div> : ''}
      </div>

      <div className='bg-dark' style={{ height: '3px' }}></div>

      <div className="container mt-4">
        <h4 className='fw-bolder'>List of Students</h4>
        <table className='table table-bordered mt-3'>
          <thead>
            <tr className='table-dark fw-bolder'>
              <td>Id</td>
              <td>Name</td>
              <td>Room No</td>
              <td>Contact</td>
              <td>Course</td>
              <td>Fee Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className='table-dark'>
            {tableData}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App