const express = require('express');
const router = express.Router();
const controller = require('../controllers/internshipController');
const { uploadFields } = require('../utils/fileHandler');

// Routes without auth middleware
router.post('/', uploadFields, controller.createInternship);
router.put('/:id', uploadFields, controller.updateInternship);
router.delete('/:id', controller.deleteInternship);
router.get('/', controller.getInternships);
router.get('/:id/files/:type', controller.getFile);

module.exports = router;
