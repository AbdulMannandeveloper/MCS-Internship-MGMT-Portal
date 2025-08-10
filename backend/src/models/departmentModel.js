const db = require('../config/db');

// Create
const createDepartment = async (deptName) => {
  const result = await db.query(
    'INSERT INTO department (dept_name) VALUES ($1) RETURNING *',
    [deptName]
  );
  return result.rows[0];
};

// Get All Departments (NEW)
const getAllDepartments = async () => {
  const result = await db.query(
    'SELECT dept_id, dept_name FROM department ORDER BY dept_id'
  );
  return result.rows;
};

module.exports = { 
  createDepartment, 
  getAllDepartments  // Export the new function
};