//const express = require('express');
//const multer = require('multer');

// const app = express();
// const cors = require('cors');
// app.use(cors());

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Or use host/user/password/dbname
});


const express = require("express");
const router = express.Router();
const upload = require('../utils/upload');
const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  uploadCV,
  openCV // Import the function
} = require("../controllers/studentController");

// POST /api/students - Create new student
router.post("/", addStudent);

// GET /api/students - Get all students
router.get("/", getStudents);

// GET /api/students/:id - Get single student
router.get("/:id", getStudent);

// PUT /api/students/:id - Update student info
router.put("/:id", updateStudent);

// DELETE /api/students/:id - Delete student
router.delete("/:id", deleteStudent);

// POST /api/students/:id/cv - Upload CV
router.post("/:id/cv", upload.single('cv'), uploadCV);

// GET /api/students/:id/cv - Upload CV
router.get("/:id/cv", async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const result = await pool.query(
      'SELECT cv, cv_mimetype FROM student WHERE student_id = $1',
      [studentId]
    );

    const student = result.rows[0];
    if (!student || !student.cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const contentType = student.cv_mimetype;
    if (!contentType) {
      return res.status(500).json({ error: 'Missing MIME type in database' });
    }

    res.setHeader('Content-Type', contentType);
    res.send(student.cv);
  } catch (err) {
    console.error('openCV error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;