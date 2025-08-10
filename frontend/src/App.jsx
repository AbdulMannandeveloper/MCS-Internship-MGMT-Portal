import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NUSTInfoPage from './NUSTInfoPage';

// Admin Components
import AdminSignUp from './Admin/adminSignUp';
import EntityMaking from './Admin/EntityMaking';
import AdminSidebar from './Admin/Sidebar';
import ViewBatch from './Admin/ViewBatch';
import ViewCourseAdvisor from './Admin/ViewCourseAdvisors';
import ViewDepartment from './Admin/ViewDepartment';
import ViewStudentsAdmin from './Admin/ViewStudents';

// Course Advisor Components
import CourseAdvisorDashboard from './Course Advisor/CourseAdvisorDashboard'
import CourseAdvisorMain from './Course Advisor/Main Screen';
import CourseAdvisorSidebar from './Course Advisor/Sidebar';
import ViewSingleStudent from './Course Advisor/View Single Student';
import ViewStudentsAdvisor from './Course Advisor/View Students';

// Login Screens
import AdminLogin from './Login Screens/AdminLogin';
import StudentLogin from './Login Screens/StudentLogin';
import TeacherLogin from './Login Screens/TeacherLogin';

// Student Components
import InternshipForm from './Student/Internship Form';
import StudentMain from './Student/Main Screen';
import StudentSidebar from './Student/Sidebar';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<NUSTInfoPage />} />

        {/* Admin */}
        <Route path="/admin/Sign-Up-form-Admin" element={<AdminSignUp />} />
        <Route path="/admin/entity" element={<EntityMaking />} />
        <Route path="/admin/sidebar" element={<AdminSidebar />} />
        <Route path="/admin/view-batch" element={<ViewBatch />} />
        <Route path="/admin/view-course-advisor" element={<ViewCourseAdvisor />} />
        <Route path="/admin/view-department" element={<ViewDepartment />} />
        <Route path="/admin/view-students" element={<ViewStudentsAdmin />} />

        {/* Course Advisor */}
        <Route path="/advisor/Dashboard" element={<CourseAdvisorDashboard />} />
        <Route path="/advisor/main" element={<CourseAdvisorMain />} />
        <Route path="/advisor/sidebar" element={<CourseAdvisorSidebar />} />
        <Route path="/advisor/view-single-student" element={<ViewSingleStudent />} />
        <Route path="/advisor/view-students" element={<ViewStudentsAdvisor />} />

        {/* Login Screens */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />

        {/* Student */}
        <Route path="/student/form" element={<InternshipForm />} />
        <Route path="/student/main" element={<StudentMain />} />
        <Route path="/student/sidebar" element={<StudentSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
