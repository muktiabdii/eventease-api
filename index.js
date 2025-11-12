require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));

const routes = require('./src/routes/index');
const uploadRoutes = require('./src/routes/uploadRoutes');
app.use('/', routes);
app.use('/', uploadRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
