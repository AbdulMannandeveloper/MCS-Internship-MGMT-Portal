const express = require("express");
const router = express.Router();
const { addBatch, getBatches, deleteBatch } = require("../controllers/batchController");

// POST /api/batches - Create new batch
router.post("/", addBatch);

// GET /api/batches - Get all batches
router.get("/", getBatches);

// DELETE /api/batches/:id - Delete batch
router.delete("/:id", deleteBatch);

module.exports = router;