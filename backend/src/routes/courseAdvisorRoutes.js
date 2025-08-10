const express = require("express");
const router = express.Router();
const {
  addCourseAdvisor,
  getCourseAdvisors,
  getCourseAdvisor,
  updateCourseAdvisor, // Now points to the handler
  deleteCourseAdvisor  // Now points to the handler
} = require("../controllers/courseAdvisorController");

router.post("/", addCourseAdvisor);
router.get("/", getCourseAdvisors);
router.get("/:id", getCourseAdvisor);
router.put("/:id", updateCourseAdvisor); // Uses the handler
router.delete("/:id", deleteCourseAdvisor); // Uses the handler

module.exports = router;