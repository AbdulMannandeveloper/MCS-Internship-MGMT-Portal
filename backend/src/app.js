const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const departmentRoutes = require("./routes/departmentRoutes");
const batchRoutes = require("./routes/batchRoutes");
const courseAdvisorRoutes = require("./routes/courseAdvisorRoutes");
const studentRoutes = require("./routes/studentRoutes"); // Add this line
const internshipRoutes = require('./routes/internshipRoutes');
const loginRoutes = require("./routes/loginFunctionalities");

// Use routes
app.use("/api/departments", departmentRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/course-advisors", courseAdvisorRoutes);
app.use("/api/students", studentRoutes); // Add this line
app.use('/api/internships', internshipRoutes);
app.use("/api", loginRoutes); // ✅ added



module.exports = app;