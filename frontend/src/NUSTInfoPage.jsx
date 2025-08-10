import { useNavigate } from 'react-router-dom';
import './NUSTInfo.css'
import nustLogo from './images/nust-logo.png';
import mcsLogo from './images/mcs-logo.png';

export default function NustInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="nust-page">
      <div className="nust-container">
        <div className="logo-header">
          <img src={nustLogo} alt="NUST Logo" className="logo left-logo" />
          <img src={mcsLogo} alt="MCS Logo" className="logo right-logo" />
        </div>

        <h1>Welcome to MCS - NUST</h1>
        <p>
          The Military College of Signals (MCS) is a constituent college of the National University of Sciences and Technology (NUST), Pakistan.
          It offers advanced degrees in Information Security, Software Engineering, Computer Science, and Electrical Engineering. MCS maintains a
          strong emphasis on practical knowledge, innovation, and academic rigor.
        </p>

        <h2>About NUST Internship Policy</h2>
        <p>
          The NUST Internship Policy ensures that every student gains relevant industry experience during their academic program. The policy outlines:
        </p>
        <ul>
          <li>Minimum internship duration: 6 weeks</li>
          <li>Internship should be aligned with the student's major</li>
          <li>Students must submit evidence, reports, and evaluation forms</li>
          <li>Course Advisors are responsible for validating the internship data</li>
          <li>Digital submission via the Internship Management System is mandatory</li>
        </ul>

        <p>
          Internships help students bridge the gap between theory and practice, and build soft skills necessary for the job market. The MCS
          Internship Cell provides guidance, placement support, and tracks compliance.
        </p>

        <div className="button-group">
          <button onClick={() => navigate('/login/student')}>Student Login</button>
          <button onClick={() => navigate('/login/teacher')}>Course Advisor Login</button>
        </div>
      </div>
    </div>
  );
}
