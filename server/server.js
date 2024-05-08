const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');


const app = express();

process.on('uncaughtException', function (err) {
  console.log(err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newProject',
    password: 'postgres',
    port: 5432,
  });

  app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }
  
      // Insert user into the Users table
      const usersQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
      await pool.query(usersQuery, [email, password]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  

  // Checking for user login credentials
  app.post('/api/login', async (req, res) => {
    const { email, password, otp } = req.body;

    try {
        // Verify the OTP along with email and password
        // Implement a function to verify OTP
        const isOTPVerified = verifyOTP(email, otp);

        if (isOTPVerified) {
            // Proceed with login
            // ...
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Incorrect OTP' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

  
// Adding a new endpoint to check if a email already exists
app.get('/api/check-user', async (req, res) => {
  const { email } = req.query;

  try {
    // Check if the email already exists in the database
    const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)';
    const result = await pool.query(query, [email]);
    const exists = result.rows[0].exists;

    res.json({ exists });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(); // Implement a function to generate OTP

  try {
      // Send the OTP to the user's email (you may use a library like Nodemailer for this)
      // Example: sendEmail(email, 'OTP for Login', `Your OTP is: ${otp}`);
      
      // Store the OTP in a temporary storage (e.g., Redis) along with the user's email for verification
      
      res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
  }
});

  // Start the server
const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

