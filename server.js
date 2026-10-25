require('dotenv').config();

const path = require('path');
const express = require('express');
const api = require('./routes/api');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Metric/Imperial Converter listening on port ${port}`);
  });
}

module.exports = app;
