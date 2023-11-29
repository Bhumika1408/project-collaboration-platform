const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:'); // Use an actual file for persistent storage in production

// ... (rest of your existing database and table creation code)

// Route to handle the custom query execution
app.post('/run-query', async (req, res) => {
  const { query } = req.body;

  try {
    const result = await executeQuery(query);
    res.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Error executing the query.' });
  }
});

async function executeQuery(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
