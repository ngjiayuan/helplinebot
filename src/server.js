const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Get data from Firebase
app.get('/data', (req, res) => {
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    res.json(data);
  });
});

// Add data to Firebase
app.post('/data', (req, res) => {
  const newData = req.body;
  ref.push(newData);
  res.status(201).send('Data added to Firebase');
});
