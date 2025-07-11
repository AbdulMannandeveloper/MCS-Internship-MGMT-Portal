import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Admin Components
import EntityMaking from './Admin/Entity_Making';
import AdminSidebar from './Admin/Sidebar';
import ViewBatch from './Admin/View_Batch';
import ViewCourseAdvisor from './Admin/View_Course_Advisors';
import ViewDepartment from './Admin/View_Department';
import ViewStudentsAdmin from './Admin/View_Students';

// Course Advisor Components
import CourseAdvisorMain from './Course Advisor/Main Screen';
import CourseAdvisorSidebar from './Course Advisor/Sidebar';
import ViewSingleStudent from './Course Advisor/View Single Student';
import ViewStudentsAdvisor from './Course Advisor/View Students';

// Login Screens
import AdminLogin from './Login Screens/Admin Login';
import StudentLogin from './Login Screens/Student';
import TeacherLogin from './Login Screens/Teacher Login';

// Student Components
import InternshipForm from './Student/Internship Form';
import StudentMain from './Student/Main Screen';
import StudentSidebar from './Student/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin */}
        <Route path="/admin/entity" element={<EntityMaking />} />
        <Route path="/admin/sidebar" element={<AdminSidebar />} />
        <Route path="/admin/view-batch" element={<ViewBatch />} />
        <Route path="/admin/view-course-advisor" element={<ViewCourseAdvisor />} />
        <Route path="/admin/view-department" element={<ViewDepartment />} />
        <Route path="/admin/view-students" element={<ViewStudentsAdmin />} />

        {/* Course Advisor */}
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
