import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/setlist')
  .then(
    () => console.log('Successfully connected to Mongo'),
    (err) => console.log(err)
  );
  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//APIS
routes(app);

app.listen(3000, () => console.log('Server listening on port 3000.'));

export default app;
