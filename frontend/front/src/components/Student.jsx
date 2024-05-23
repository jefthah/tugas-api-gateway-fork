import React, { useState, useEffect } from 'react';
import './Student.css';
import axios from 'axios';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ id: '', nim: '', name: '', email: '', telp: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const fetchStudents = async () => {
    try {
      const studentsResponse = await axios.get("http://localhost:3000/students");
      setStudents(studentsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    if (formData.id) {
      // Penanganan untuk update data
      try {
        const response = await axios.put(`http://localhost:3000/students/${formData.id}`, {
          email: formData.email,
          telp: formData.telp
        });
        const updatedStudent = response.data;
        setStudents((prevStudents) =>
          prevStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
        );
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error('Error updating student:', error);
        }
      }
    } else {
      // Penanganan untuk tambah data baru
      try {
        const response = await axios.post('http://localhost:3000/students', formData);
        const { message, result } = response.data;
        setStudents((prevStudents) => [...prevStudents, result]);
        // Tampilkan pesan dari backend
        alert(message);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error('Error adding student:', error);
        }
      }
    }
    setFormData({ id: '', nim: '', name: '', email: '', telp: '' });
  };

  const handleEditClick = (student) => {
    setFormData(student);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/students/${id}`);
      const { message } = response.data;
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
      // Tampilkan notifikasi atau pesan yang sesuai dengan respons dari backend
      alert(message);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          {errorMessage && <div className="notification is-danger">{errorMessage}</div>}
          <table className="table is-striped is-fullwidth">
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
              {students.map((student) => (
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
                disabled={!!formData.id}
              />
            </div>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!!formData.id}
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
