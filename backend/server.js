const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/api', require('./src/routes/index'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});