// CourseAdvisorDashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './CourseAdvisorDashboard.css';

const dummyStudents = [
  {
    registrationNumber: "SE2022-001",
    name: "Ali Raza",
    batch: "2022",
    department: "Software Engineering",
    cvUrl: "#",
    internshipStatus: "Completed",
    internshipRecords: [
      {
        durationWeeks: 8,
        evidences: "#",
        survey1: "#",
        survey2: "#",
        survey3: "#",
        yearOfCompletion: 2023,
        internshipType: "Industry",
        reportingOfficer: "John Smith",
        organization: "Tech Inc.",
        contact: "+923001112233",
        email: "john@tech.com",
        website: "https://tech.com"
      }
    ]
  }
];

const CourseAdvisorDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({ name: '', batch: '', department: '', status: '' });

  const filteredStudents = dummyStudents.filter(std => {
    return (
      std.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.batch === '' || std.batch === filters.batch) &&
      (filters.department === '' || std.department === filters.department) &&
      (filters.status === '' || std.internshipStatus === filters.status)
    );
  });

  const counts = {
    total: dummyStudents.length,
    completed: dummyStudents.filter(s => s.internshipStatus === 'Completed').length,
    incomplete: dummyStudents.filter(s => s.internshipStatus === 'Incomplete').length
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <section className="analytics-section">
          <div className="card">Total Students: {counts.total}</div>
          <div className="card">Completed: {counts.completed}</div>
          <div className="card">Incomplete: {counts.incomplete}</div>
        </section>

        <section className="filters-section">
          <input placeholder="Search Name" onChange={e => setFilters({ ...filters, name: e.target.value })} />
          <input placeholder="Batch" onChange={e => setFilters({ ...filters, batch: e.target.value })} />
          <input placeholder="Department" onChange={e => setFilters({ ...filters, department: e.target.value })} />
          <select onChange={e => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </section>

        <table className="students-table">
          <thead>
            <tr>
              <th>Reg#</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Department</th>
              <th>CV</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((std, i) => (
              <tr key={i}>
                <td>{std.registrationNumber}</td>
                <td>{std.name}</td>
                <td>{std.batch}</td>
                <td>{std.department}</td>
                <td><a href={std.cvUrl} download>Download</a></td>
                <td><span className={`status ${std.internshipStatus.toLowerCase()}`}>{std.internshipStatus}</span></td>
                <td><button onClick={() => setSelectedStudent(std)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedStudent && (
          <div className="modal">
            <div className="modal-content">
              <h3>{selectedStudent.name} - Internship Details</h3>
              <p><strong>Reg#:</strong> {selectedStudent.registrationNumber}</p>
              <p><strong>Batch:</strong> {selectedStudent.batch}</p>
              <p><strong>Department:</strong> {selectedStudent.department}</p>

              <table className="internship-details-table">
                <thead>
                  <tr>
                    <th>Weeks</th>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Org</th>
                    <th>Officer</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Evidence</th>
                    <th>Survey1</th>
                    <th>Survey2</th>
                    <th>Survey3</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.internshipRecords.map((rec, i) => (
                    <tr key={i}>
                      <td>{rec.durationWeeks}</td>
                      <td>{rec.yearOfCompletion}</td>
                      <td>{rec.internshipType}</td>
                      <td>{rec.organization}</td>
                      <td>{rec.reportingOfficer}</td>
                      <td>{rec.contact}</td>
                      <td>{rec.email}</td>
                      <td><a href={rec.website} target="_blank">Link</a></td>
                      <td><a href={rec.evidences} download>Evidence</a></td>
                      <td><a href={rec.survey1} download>S1</a></td>
                      <td><a href={rec.survey2} download>S2</a></td>
                      <td><a href={rec.survey3} download>S3</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setSelectedStudent(null)}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseAdvisorDashboard;
