const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Image = require('../models/Image');
const { protect } = require('../middleware/authMiddleware');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'studiogallery',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, crop: 'limit', quality: 'auto' }] // Compression & scaling
  }
});

const upload = multer({ storage: storage });

// @route   GET /api/images
// @desc    Get all images (can filter by category ?category=ID)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categoryFilter = req.query.category ? { category: req.query.category } : {};
    const images = await Image.find(categoryFilter).populate('category').sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/images
// @desc    Upload one or more images (up to 20 at once)
// @access  Private (Admin)
router.post('/', protect, upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const { category, caption } = req.body;
    
    if (!category) {
      // Clean up all uploaded images if category is missing
      for (const file of req.files) {
        await cloudinary.uploader.destroy(file.filename);
      }
      return res.status(400).json({ message: 'Category is required' });
    }

    const createdImages = [];
    for (const file of req.files) {
      const newImage = await Image.create({
        url: file.path,
        public_id: file.filename,
        category,
        caption: caption || ''
      });
      await newImage.populate('category');
      createdImages.push(newImage);
    }

    res.status(201).json(createdImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/images/:id
// @desc    Delete an image
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);
    
    // Delete from DB
    await image.deleteOne();
    
    res.json({ message: 'Image removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
