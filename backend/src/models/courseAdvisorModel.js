const db = require('../config/db');

// Create new course advisor
const createCourseAdvisor = async (loginId, password, advisorName, batchId, adminId) => {
  const result = await db.query(
    `INSERT INTO course_advisor (login_id, password, advisor_name, batch_id, admin_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [loginId, password, advisorName, batchId, adminId]
  );
  return result.rows[0];
};

// Get all course advisors with batch and admin info
const getAllCourseAdvisors = async () => {
  const result = await db.query(
    `SELECT ca.advisor_id, ca.login_id, ca.password, ca.advisor_name,
            b.batch_id, b.batch_name, 
            a.admin_id, a.login_id AS admin_login
     FROM course_advisor ca
     JOIN batch b ON ca.batch_id = b.batch_id
     JOIN admin a ON ca.admin_id = a.admin_id
     ORDER BY ca.advisor_name`
  );
  return result.rows;
};

// Get course advisor by ID
const getCourseAdvisorById = async (advisorId) => {
  const result = await db.query(
    `SELECT ca.advisor_id, ca.login_id, ca.password, ca.advisor_name,
            b.batch_id, b.batch_name, 
            a.admin_id, a.login_id AS admin_login
     FROM course_advisor ca
     JOIN batch b ON ca.batch_id = b.batch_id
     JOIN admin a ON ca.admin_id = a.admin_id
     WHERE ca.advisor_id = $1`,
    [advisorId]
  );
  return result.rows[0];
};

// Update course advisor
const updateCourseAdvisor = async (advisorId, updateData) => {
  const { login_id, password, advisor_name, batch_id } = updateData;
  
  const result = await db.query(
    `UPDATE course_advisor
     SET login_id = $1, password = $2, advisor_name = $3, batch_id = $4
     WHERE advisor_id = $5 RETURNING *`,
    [login_id, password, advisor_name, batch_id, advisorId]
  );
  return result.rows[0];
};

// Delete course advisor
const deleteCourseAdvisor = async (advisorId) => {
  const result = await db.query(
    'DELETE FROM course_advisor WHERE advisor_id = $1 RETURNING *',
    [advisorId]
  );
  return result.rows[0];
};

module.exports = {
  createCourseAdvisor,
  getAllCourseAdvisors,
  getCourseAdvisorById,
  updateCourseAdvisor,
  deleteCourseAdvisor
};