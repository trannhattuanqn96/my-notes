require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
import useRoutes from './routers';

const app = express();
const port = process.env.PORT || 4000;

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// mongoose
//   .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
//   .then(() => {
//     console.log('connected database');
//   })
//   .catch((err) => console.log(err));
// request handlers
useRoutes(app);
app.listen(port, () => {
  console.log('Server started on: ' + port);
});