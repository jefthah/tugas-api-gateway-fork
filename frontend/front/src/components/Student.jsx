import React, { useState } from 'react';
import './Student.css';

const Student = () => {
  const initialStudents = [
    { id: 1, nim: '2110511131', nama: 'Cherry Cosu' }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ id: '', nim: '', nama: '' });
  const [newStudentData, setNewStudentData] = useState({ nim: '', nama: '' });

  const handleEditClick = (student) => {
    setEditing(student.id);
    setFormData(student);
  };

  const handleDeleteClick = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleInputChange = (e, setDataFunction) => {
    setDataFunction(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStudents(students.map(student => (student.id === formData.id ? formData : student)));
    setEditing(null);
    setFormData({ id: '', nim: '', nama: '' });
  };

  const handleNewStudentSubmit = (e) => {
    e.preventDefault();
    const newStudent = { id: students.length + 1, ...newStudentData };
    setStudents([...students, newStudent]);
    setNewStudentData({ nim: '', nama: '' });
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
                <th>Nama</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.nim}</td>
                  <td>{student.nama}</td>
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

      {editing && (
        <div className="columns mt-5 is-centered">
          <div className="column is-half">
            <form className="form-container" onSubmit={handleFormSubmit}>
              <div>
                <label>NIM</label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <div>
                <label>Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}

      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <form className="form-container" onSubmit={handleNewStudentSubmit}>
            <h2>Add New Student</h2>
            <div>
              <label>NIM</label>
              <input
                type="text"
                name="nim"
                value={newStudentData.nim}
                onChange={(e) => handleInputChange(e, setNewStudentData)}
              />
            </div>
            <div>
              <label>Nama</label>
              <input
                type="text"
                name="nama"
                value={newStudentData.nama}
                onChange={(e) => handleInputChange(e, setNewStudentData)}
              />
            </div>
            <button type="submit">Add Student</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student;
