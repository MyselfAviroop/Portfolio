// server.js

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Environment Variables
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/contactFormDB";

// MongoDB Connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process with failure
  });

// Define Schemas and Models
const messageSchema = new mongoose.Schema({
  message: String
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Message = mongoose.model('Message', messageSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Middleware Setup
app.use(express.static('public')); // Serve static frontend files
app.use(cors());                  // Enable CORS for all routes
app.use(bodyParser.json());       // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes

// Route to handle message sending
app.post('/api/sendMessage', async (req, res) => {
  const { message } = req.body;

  try {
    const newMessage = new Message({ message });
    await newMessage.save();
    res.status(200).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Error saving message' });
  }
});

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ success: true, message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).json({ success: false, message: 'Error saving form data', error });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
