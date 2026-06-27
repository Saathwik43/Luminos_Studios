const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/services
// @desc    Create a new service package
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, price, features, category } = req.body;
    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'Name, description and price are required' });
    }

    const service = await Service.create({
      name,
      description,
      price,
      features: features || [],
      category: category || 'Other'
    });

    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/services/:id
// @desc    Update an existing service package
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, description, price, features, category } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.name = name !== undefined ? name : service.name;
    service.description = description !== undefined ? description : service.description;
    service.price = price !== undefined ? price : service.price;
    service.features = features !== undefined ? features : service.features;
    service.category = category !== undefined ? category : service.category;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service package
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
