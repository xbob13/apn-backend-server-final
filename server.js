const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express(); // ✅ Moved this up
const PORT = process.env.PORT || 3001;

// ✅ CORS FIX (must go after `app` is declared)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors());
app.use(express.json());

app.post('/run/blogs', (req, res) => {
  exec('echo Blog automation triggered!', (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

app.post('/run/youtube', (req, res) => {
  exec('echo YouTube automation triggered!', (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

app.post('/run/crypto', (req, res) => {
  console.log('Triggering crypto bot...');
  exec('node cryptoBot.js', (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

app.post('/run/tools', (req, res) => {
  exec('echo AI tools deployment triggered!', (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

// Alias routes for Chrome Extension
app.post('/trigger/blog', (req, res) => res.redirect(307, '/run/blogs'));
app.post('/trigger/youtube', (req, res) => res.redirect(307, '/run/youtube'));
app.post('/trigger/crypto', (req, res) => res.redirect(307, '/run/crypto'));
app.post('/trigger/ai', (req, res) => res.redirect(307, '/run/tools'));

app.get('/', (req, res) => {
  res.send('✅ APN Backend API is live and running.');
});

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
