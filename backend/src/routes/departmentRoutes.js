const express = require("express");
const router = express.Router(); 
const { 
  addDepartment, 
  getDepartments  // Import new controller
} = require("../controllers/departmentController");

// POST - Create department
router.post("/", addDepartment);

// NEW: GET - Get all departments
router.get("/", getDepartments);

module.exports = router;