import express from 'express';
import cors from 'cors';
import api from './api';

const port = 9888;
const API_ROOT = `http://localhost:${port}/api`;

const app = express();

// To allow CrossOrigin Requests
app.use(cors());

app.use('/api', api);

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up %s in your browser.', port, API_ROOT);
  }
});
