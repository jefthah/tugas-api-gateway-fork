import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Student from './components/Student';
import Navbar from './components/Navbar';
import Subject from './components/Subject';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/student" />} />
          <Route path="/student" element={<Student />} />
          <Route path="/subject" element={<Subject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
