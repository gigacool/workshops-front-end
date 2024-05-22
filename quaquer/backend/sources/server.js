require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const quackRoutes = require('./routes/quackRoutes');
const { connect, close } = require('./config/memoryServer');

const app = express();

app.use(express.json());
app.use(bodyParser.text({ type: 'text/plain' }))

const startServer = async () => {
  if (process.env.USE_MEMORY_DB === 'true') {
    await connect();
  } else {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  app.use('/api/users', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/quacks', quackRoutes); 

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on('SIGINT', async () => {
    if (process.env.USE_MEMORY_DB === 'true') {
      await close();
    }
    process.exit(0);
  });
};

startServer();
