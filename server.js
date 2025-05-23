
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;

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
  exec('echo Crypto bot triggered!', (err, stdout, stderr) => {
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

app.get('/', (req, res) => {
  res.send('✅ APN Backend API is live and running.');
});

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
