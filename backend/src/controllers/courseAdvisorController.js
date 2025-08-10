const {
  createCourseAdvisor,
  getAllCourseAdvisors,
  getCourseAdvisorById,
  updateCourseAdvisor: updateCA, // Renamed import
  deleteCourseAdvisor: deleteCA // Renamed import
} = require('../models/courseAdvisorModel');

// Create new course advisor
const addCourseAdvisor = async (req, res) => {
  try {
    const { login_id, password, advisor_name, batch_id, admin_id } = req.body;
    
    // Basic validation
    if (!login_id || !password || !advisor_name || !batch_id || !admin_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newAdvisor = await createCourseAdvisor(
      login_id, password, advisor_name, batch_id, admin_id
    );
    
    res.status(201).json({ 
      message: 'Course advisor created', 
      advisor: newAdvisor 
    });
  } catch (err) {
    console.error(err);
    
    // Handle unique constraint violation
    if (err.code === '23505') {
      return res.status(409).json({ 
        error: 'Login ID already exists' 
      });
    }
    
    // Handle foreign key violation
    if (err.code === '23503') {
      return res.status(400).json({ 
        error: 'Invalid batch or admin ID' 
      });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all course advisors
const getCourseAdvisors = async (req, res) => {
  try {
    const advisors = await getAllCourseAdvisors();
    res.status(200).json(advisors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single course advisor by ID
const getCourseAdvisor = async (req, res) => {
  try {
    const advisorId = parseInt(req.params.id);
    if (isNaN(advisorId)) {
      return res.status(400).json({ error: 'Invalid advisor ID' });
    }

    const advisor = await getCourseAdvisorById(advisorId);
    if (!advisor) {
      return res.status(404).json({ error: 'Course advisor not found' });
    }

    res.status(200).json(advisor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE course advisor (changed function name)
const updateCourseAdvisorHandler = async (req, res) => {
  try {
    const advisorId = parseInt(req.params.id);
    if (isNaN(advisorId)) {
      return res.status(400).json({ error: 'Invalid advisor ID' });
    }

    const { login_id, password, advisor_name, batch_id } = req.body;
    
    if (!login_id || !password || !advisor_name || !batch_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedAdvisor = await updateCA(advisorId, { // Use renamed import
      login_id,
      password,
      advisor_name,
      batch_id
    });

    if (!updatedAdvisor) {
      return res.status(404).json({ error: 'Course advisor not found' });
    }

    res.status(200).json({ 
      message: 'Course advisor updated', 
      advisor: updatedAdvisor 
    });
  } catch (err) {
    console.error(err);
    
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Login ID already exists' });
    }
    
    if (err.code === '23503') {
      return res.status(400).json({ error: 'Invalid batch ID' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE course advisor (changed function name)
const deleteCourseAdvisorHandler = async (req, res) => {
  try {
    const advisorId = parseInt(req.params.id);
    if (isNaN(advisorId)) {
      return res.status(400).json({ error: 'Invalid advisor ID' });
    }

    const deletedAdvisor = await deleteCA(advisorId); // Use renamed import
    if (!deletedAdvisor) {
      return res.status(404).json({ error: 'Course advisor not found' });
    }

    res.status(200).json({ 
      message: 'Course advisor deleted', 
      advisor: deletedAdvisor 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addCourseAdvisor,
  getCourseAdvisors,
  getCourseAdvisor,
  updateCourseAdvisor: updateCourseAdvisorHandler, // Export with new name
  deleteCourseAdvisor: deleteCourseAdvisorHandler  // Export with new name
};
