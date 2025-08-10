const Internship = require('../models/internshipModel');
const { handleFiles } = require('../utils/fileHandler');

// CREATE INTERNSHIP
exports.createInternship = async (req, res) => {
  try {
    console.log("Entered into the controller");
    const student_id = req.body.student_id;
    console.log("Student ID:", student_id);

    const fileData = handleFiles(req.files);
    const newRecord = await Internship.create({ student_id: student_id, ...req.body, ...fileData });

    console.log("Getting out from the controller");
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE INTERNSHIP
exports.updateInternship = async (req, res) => {
  try {
    console.log("entered into the update controller");
    const { id } = req.params;
    console.log(id);
    const student_id = req.body.student_id;
    console.log(student_id);

    const fileData = handleFiles(req.files);
    const updated = await Internship.update(id, student_id, { ...req.body, ...fileData });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE INTERNSHIP
exports.deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const student_id = req.body.student_id;

    const deleted = await Internship.delete(id, student_id);
    res.json({ message: 'Internship deleted', deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL INTERNSHIPS FOR A STUDENT
exports.getInternships = async (req, res) => {
  try {
    console.log('Entered into the contorller');
    console.log(req.body);
    const student_id = req.query.student_id || req.body.student_id;
    console.log(student_id);
    const internships = await Internship.findByStudent(student_id);
    console.log(internships);
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SPECIFIC FILE
exports.getFile = async (req, res) => {
  try {
    const { id, type } = req.params;
    const student_id = req.query.student_id || req.body.student_id;

    const file = await Internship.getFile(id, student_id, type);

    if (!file || !file.content) {
      return res.status(404).send('File not found');
    }

    res.set('Content-Type', file.mimetype);
    res.send(file.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
