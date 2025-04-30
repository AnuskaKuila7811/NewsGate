const express = require('express');
const path = require('path');
const app = express();

// Serve static files like style.css, script.js
app.use(express.static(__dirname));

// Serve login page on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve news page
app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, 'news.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
