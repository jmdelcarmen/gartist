import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import routes from './routes';
const app = express();

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

// routes(app);

app.listen(3000, () => console.log('Server listening on port 3000.'));

export default app;
