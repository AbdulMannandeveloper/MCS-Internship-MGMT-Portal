const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Utility login handler
const loginUser = async (req, res, tableName) => {
  const { login_id, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM ${tableName} WHERE login_id = $1 AND password = $2`,
      [login_id, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        login_id: user.login_id,
        role: tableName
      }
    });
  } catch (error) {
    console.error(`Login error for ${tableName}:`, error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login endpoints
router.post("/login/admin", (req, res) => loginUser(req, res, "admin"));
router.post("/login/course_advisor", (req, res) => loginUser(req, res, "course_advisor"));
router.post("/login/student", (req, res) => loginUser(req, res, "student"));

// Admin signup (plain text password)
router.post("/signup/admin", async (req, res) => {
  const { login_id, password } = req.body;

  try {
    await pool.query(
      "INSERT INTO admin (login_id, password) VALUES ($1, $2)",
      [login_id, password]
    );

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
