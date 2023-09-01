const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// PostgreSQL database connection
const pool = new Pool({
  user: 'tharun',
  host: 'localhost',
  database: 'jinusers',
  password: 'Th@run666',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, password]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
});


//Forget Password Route
app.put('/forgetpassword:email', async (req, res) => {
  const { email } = req.params;
  const { password } = req.body
  try {
    await pool.query(
      'UPDATE users SET password = $2 WHERE email = $1',
          [email,password]
    );

    res.status(201).json({ message:'password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
});


app.put('/profile/:email', async (req, res) => {
  const { email } = req.params
    const { dob,mobile,designition } = req.body;
  
    try {
         await pool.query(
          'UPDATE profile SET dob = $1, mobile = $2, designition = $3 WHERE email = $4',
          [dob, mobile, designition,email]
        );
    
        res.status(200).json({ message: 'Profile updated successfully' });
      } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'An error occurred while updating the profile' });
      }
    });



    app.get('/profile/:email', async (req, res) => {
      const { email } = req.params
        try {
            const result = await pool.query(
              'SELECT * FROM profile WHERE email = $1',
              [email]
            );
            res.status(200).json({ dob: result.rows[0].dob, mobile: result.rows[0].mobile, 
              designition: result.rows[0].designition });
          } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'An error occurred while updating the profile' });
          }
        });

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [
      email,
      password,
    ]);

    if (result.rows.length === 1) {
        const profileemail = await pool.query('SELECT * FROM profile WHERE email = $1',[email]);
        if(profileemail.rows.length === 0){
        await pool.query(
            'INSERT INTO profile (email) VALUES ($1)',
            [email]
          ); }
      res.status(200).json({ email: result.rows[0].email, name: result.rows[0].name });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
