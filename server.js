require('dotenv').config();
const express = require('express');
const { Track } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /api/tracks - Get all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tracks/:id - Get track by ID
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).json({ message: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tracks - Create new track
app.post('/api/tracks', async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/tracks/:id - Update existing track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (track) {
      await track.update(req.body);
      res.json(track);
    } else {
      res.status(404).json({ message: 'Track not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/tracks/:id - Delete track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (track) {
      await track.destroy();
      res.json({ message: 'Track deleted successfully' });
    } else {
      res.status(404).json({ message: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
