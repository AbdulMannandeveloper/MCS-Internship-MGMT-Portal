const { createBatch, getAllBatches, deleteBatchById } = require('../models/batchModel');

// Add new batch
const addBatch = async (req, res) => {
  try {
    const { batch_year, batch_name, dept_id } = req.body;
    
    // Validate input
    if (!batch_year || !batch_name || !dept_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBatch = await createBatch(batch_year, batch_name, dept_id);
    res.status(201).json({ message: 'Batch created', batch: newBatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all batches
const getBatches = async (req, res) => {
  try {
    const batches = await getAllBatches();
    res.status(200).json(batches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete batch
const deleteBatch = async (req, res) => {
  try {
    const batchId = parseInt(req.params.id);
    if (isNaN(batchId)) {
      return res.status(400).json({ error: 'Invalid batch ID' });
    }

    const deletedBatch = await deleteBatchById(batchId);
    if (!deletedBatch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    res.status(200).json({ message: 'Batch deleted', batch: deletedBatch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addBatch, getBatches, deleteBatch };