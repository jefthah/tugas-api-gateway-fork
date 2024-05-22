import React, { useState, useEffect } from 'react';
import './Student.css';
import axios from 'axios';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ id: '', nim: '', name: '', email: '', telp: '' });

  const fetchStudents = async () => {
    try {
      const studentsResponse = await axios.get("http://localhost:3000/students");
      setStudents(studentsResponse.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchStudents();
  }, [])
  // useEffect(() => {
  //   fetch('http://localhost:3000/students')
  //     .then(response => response.json())
  //     .then(data => setStudents(data))
  //     .catch(error => console.error('Error fetching students:', error));
  // }, []);

const handleInputChange = (e) => {
  setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  if (formData.id) {
    // Jika ada ID, lakukan update
    fetch(`http://localhost:3001/students/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(updatedStudent => {
      const updatedStudents = students.map(student => {
        if (student.id === updatedStudent.id) {
          return updatedStudent;
        }
        return student;
      });
      setStudents(updatedStudents);
      setFormData({ id: '', nim: '', name: '', email: '', telp: '' });
    })
    .catch(error => console.error('Error updating student:', error));
  } else {
    // Jika tidak ada ID, lakukan penambahan baru
    fetch('http://localhost:3001/students/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newStudent => {
      setStudents([...students, newStudent]);
      setFormData({ id: '', nim: '', name: '', email: '', telp: '' });
    })
    .catch(error => console.error('Error adding student:', error));
  }
};

const handleEditClick = (student) => {
  setFormData(student);
};

const handleDeleteClick = (id) => {
  fetch(`http://localhost:3001/students/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  })
  .catch(error => console.error('Error deleting student:', error));
};

return (
  <div>
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NIM</th>
              <th>Name</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.nim}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.telp}</td>
                <td>
                  
                  <button className="button button-edit" onClick={() => handleEditClick(student)}>Edit</button>
                  <button className="button button-delete" onClick={() => handleDeleteClick(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form className="form-container" onSubmit={handleFormSubmit}>
          <input type="hidden" name="id" value={formData.id} />
          <div>
            <label>NIM</label>
            <input
              type="text"
              name="nim"
              value={formData.nim}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Telephone</label>
            <input
              type="text"
              name="telp"
              value={formData.telp}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">{formData.id ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  </div>
);
};

export default Student;

