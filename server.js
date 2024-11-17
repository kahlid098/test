require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;  // Backend server port

// Enable CORS for local development
app.use(cors());  // Allow all origins (you can specify specific domains here)

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer setup for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ka1239996@gmail.com',  // Replace with your Gmail email address
    pass: process.env.GMAIL_APP_PASSWORD  // Use environment variable for security
  }
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, mobile, message } = req.body;

  // Email content
  const mailOptions = {
    from: 'ka1239996@gmail.com',  // Same as the 'user' field in the transporter auth
    to: 'ka1239996@gmail.com',    // Replace with the recipient's email address
    subject: 'New Inquiry from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);  // Log the error details
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ', info.response);  // Log the success message
      res.status(200).send('Form submitted successfully');
    }
  });
});

app.get("/",(req,res)=>{
  res.send("api working...");
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});