require('dotenv').config();
const express = require('express');
const app = express();

// Middleware global
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./src/routes/index');
const uploadRoutes = require('./src/routes/uploadRoutes');

// Prefix API utama
app.use('/api', routes);

// Route upload (biar rapi, tetap pakai prefix api)
app.use('/api/upload', uploadRoutes);

// Root endpoint (opsional)
app.get('/', (req, res) => {
  res.send('✅ EventEase API is running...');
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
