const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// env
env.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://dtweninger:mongo@cluster0.r1tfdft.mongodb.net/ecommerce`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Use bodyParser middleware for JSON parsing
app.use(express.json());

// Use your API routes
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
