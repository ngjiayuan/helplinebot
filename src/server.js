const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Telegram Bot Server is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});