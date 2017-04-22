const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log('Server listening on port 3000.');
});
