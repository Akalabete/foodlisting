const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose');

const app = express();


app.use(bodyParser.json());


connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});