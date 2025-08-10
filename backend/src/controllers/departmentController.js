const { createDepartment, getAllDepartments } = require('../models/departmentModel');

const addDepartment = async (req, res) => {
  try {
    const { dept_name } = req.body;

    if (!dept_name || dept_name.trim() === '') {
      return res.status(400).json({ error: 'Department name is required' });
    }

    const department = await createDepartment(dept_name.trim());
    res.status(201).json(department);
  } catch (error) {
    console.error('Add Department Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Get Departments Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addDepartment,
  getDepartments,
};
