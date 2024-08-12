const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WJ28@krhps', // Your MySQL password
  database: 'bannerDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.json());

// Get banner settings
app.get('/api/banner', (req, res) => {
  const sql = 'SELECT * FROM banner WHERE id = 1'; // Assuming single row for simplicity
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update banner settings
app.post('/api/banner', (req, res) => {
  const { description, timer, link } = req.body;
  const sql = 'UPDATE banner SET description = ?, timer = ?, link = ? WHERE id = 1';
  db.query(sql, [description, timer, link], (err, result) => {
    if (err) throw err;
    res.send('Banner settings updated successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

