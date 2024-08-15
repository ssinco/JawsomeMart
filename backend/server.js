const express = require('express');
const app = express();
const port = 3030;
require('dotenv').config();
const path = require('path');
const db = require('./config/db.js');
const cors = require('cors'); // Import CORS

const productsRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');

db();

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NODE_ENV:', process.env.MONGO_URI);

app.use(cors()); // Enable CORS
app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use('/api/auth', userRoutes);
app.use('/api', productsRoutes);

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
