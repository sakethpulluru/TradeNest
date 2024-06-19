const express = require('express');
const router = express.Router();
const { createPool } = require('mysql2');

// Create a connection pool
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'saketh@2006',
  database: 'saketh',
  connectionLimit: 100
});

// GET /api/users endpoint
router.get('/', (req, res) => {
  // Perform the database query using the connection pool
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Return the results as JSON response
  });
});

// POST /api/users endpoint to create a new user
router.post('/', (req, res) => {
  const { email, username, password, address, state, postcode, country } = req.body;

  const sql = `
    INSERT INTO users (email, username, password, address, state, pincode, country, prevorder)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [email, username, password, address, state, postcode, country, ''];

  // Execute the query using the connection pool
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Failed to create user' });
    }
    console.log('Inserted new user successfully:', results);
    res.status(201).json({ message: 'User created successfully', newUser: { id: results.insertId, ...req.body } });
  });
});
