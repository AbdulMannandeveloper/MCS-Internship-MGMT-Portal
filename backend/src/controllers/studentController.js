const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentCV,
  deleteStudent
} = require('../models/studentModel');

// Create new student
const addStudent = async (req, res) => {
  try {
    const { login_id, password, student_name, registration_number, batch_id, admin_id } = req.body;
    
    // Validate input
    if (!login_id || !password || !student_name || !registration_number || !batch_id || !admin_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newStudent = await createStudent(
      login_id, password, student_name, registration_number, batch_id, admin_id
    );
    
    res.status(201).json({ 
      message: 'Student created', 
      student: newStudent 
    });
  } catch (err) {
    console.error(err);
    
    // Handle unique constraint violations
    if (err.code === '23505') {
      if (err.constraint === 'student_login_id_key') {
        return res.status(409).json({ error: 'Login ID already exists' });
      }
      if (err.constraint === 'student_registration_number_key') {
        return res.status(409).json({ error: 'Registration number already exists' });
      }
    }
    
    // Handle foreign key violation
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Invalid batch or admin ID' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single student by ID
const getStudent = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Don't send the CV in the list response - it's too large
    delete student.cv;
    
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update student info
const updateStudentHandler = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const { login_id, password, student_name, registration_number, batch_id } = req.body;
    
    // Basic validation
    if (!login_id || !password || !student_name || !registration_number || !batch_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedStudent = await updateStudent(studentId, {
      login_id,
      password,
      student_name,
      registration_number,
      batch_id
    });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ 
      message: 'Student updated', 
      student: updatedStudent 
    });
  } catch (err) {
    console.error(err);
    
    // Handle unique constraint violations
    if (err.code === '23505') {
      if (err.constraint === 'student_login_id_key') {
        return res.status(409).json({ error: 'Login ID already exists' });
      }
      if (err.constraint === 'student_registration_number_key') {
        return res.status(409).json({ error: 'Registration number already exists' });
      }
    }
    
    // Handle foreign key violation
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Invalid batch ID' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload CV (separate endpoint)
const uploadCV = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ 
        error: 'Invalid file type. Only PDF, DOC, and DOCX are allowed' 
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res.status(400).json({ 
        error: 'File too large. Maximum size is 5MB' 
      });
    }

    const updatedStudent = await updateStudentCV(studentId, req.file.buffer, req.file.mimetype);
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ 
      message: 'CV uploaded successfully',
      student: updatedStudent
    });
  } catch (err) {
    //console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete student
const deleteStudentHandler = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const deletedStudent = await deleteStudent(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ 
      message: 'Student deleted', 
      student: deletedStudent 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Download CV
const downloadCV = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await getStudentById(studentId);
    if (!student || !student.cv) {
      return res.status(404).json({ error: 'CV not found for this student' });
    }

    // Determine file type
    let fileExtension = 'pdf';
    let contentType = 'application/pdf';
    
    // Add more types if needed
    if (student.cv_mimetype) {
      contentType = student.cv_mimetype;
      if (student.cv_mimetype === 'application/msword') {
        fileExtension = 'doc';
      } else if (student.cv_mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fileExtension = 'docx';
      }
    }

    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${student.student_name}_CV.${fileExtension}`);
    
    // Send the file content
    res.send(student.cv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const { getStudentCV } = require('../models/studentModel');

const openCV = async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const student = await getStudentCV(studentId);
    if (!student || !student.cv) {
      return res.status(404).json({ error: 'CV not found for this student' });
    }

    const contentType = student.cv_mimetype || 'application/pdf';
    res.setHeader('Content-Type', contentType);

    if (contentType === 'application/pdf') {
      res.setHeader('Content-Disposition', `inline; filename="${student.student_name}_CV.pdf"`);
    } else {
      const extension = contentType.includes('document') ? 'docx' : 'doc';
      res.setHeader('Content-Disposition', `attachment; filename="${student.student_name}_CV.${extension}"`);
    }

    res.send(student.cv); // Send the buffer directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Make sure to export openCV
module.exports = {
  addStudent,
  getStudents,
  getStudent,
  updateStudent: updateStudentHandler,
  deleteStudent: deleteStudentHandler,
  uploadCV,
  openCV // Export the function
};