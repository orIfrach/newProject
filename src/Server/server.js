const cors = require('cors');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');


const app = express();

process.on('uncaughtException', function (err) {
  console.log(err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'newProject',
    password: 'postgres',
    port: 5432,
  });

  app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }
  
      const person_uid = uuidv4(); // Generate a new UUID for the person
  
      // Insert user into the User table
      const registeredUserQuery = 'INSERT INTO User (email, Password, RegistrationDate) VALUES ($1, $2,NOW())';
      await pool.query(registeredUserQuery, [person_uid, username, password,email]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  

  // Checking for user login credentials
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the username and password match a registered user
      const query = 'SELECT * FROM Users WHERE email = $1 AND Password = $2';
      const result = await pool.query(query, [email, password]);
  
      if (result.rowCount === 1) {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  });

  // Start the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});