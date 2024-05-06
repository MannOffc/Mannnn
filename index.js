const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);

// Middleware untuk CORS
app.use(cors());

// Endpoint untuk servis dokumen HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});
app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-detail.html'));
});

// Endpoint untuk ragBot
app.get('/api/ai/ragbot', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await ragBot(message);
    res.status(200).json({
      status: 200,
      creator: "MannR",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle 404 error
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app