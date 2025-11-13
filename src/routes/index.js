const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');
const cloudinary = require('../config/cloudinary');
const { uploadImage } = require('../controllers/UploadController');
const userRoutes = require('./userRoutes');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req, res) => {
  res.send('✅ EventEase API running');
});

router.post('/upload', upload.single('image'), uploadImage);

router.post('/events', async (req, res) => {
  try {
    const { title, description, date, location, capacity, creator_id, image_base64 } = req.body;

    if (!title || !description || !date || !location || !capacity || !creator_id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    let imageUrl = null;

    if (image_base64) {
      const result = await cloudinary.uploader.upload(image_base64, { folder: 'eventease' });
      imageUrl = result.secure_url;
    }

    const [insertResult] = await db.query(
      `INSERT INTO events (title, description, date, location, capacity, image, creator_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, date, location, capacity, imageUrl, creator_id]
    );

    res.json({
      success: true,
      message: 'Event created successfully',
      event_id: insertResult.insertId,
      image_url: imageUrl,
    });
  } catch (error) {
    console.error('❌ Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: error.message,
    });
  }
});

router.use('/users', userRoutes);

module.exports = router;
