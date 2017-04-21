const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const API_KEY = process.env.GEN_KEY;
const lyricist = require('lyricist')(API_KEY);

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/search', (req, res) => {
  const options = {
    url: `https://api.genius.com/search?q=${req.body.q}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  };
  axios(options)
    .then(result => {
      const data = result.data.response.hits;
      res.send(data);
    });
});
app.post('/lyrics', (req, res) => {
  const id = parseInt(req.body.songId);
  lyricist.song(id, (err, song) => res.send(song.lyrics));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
