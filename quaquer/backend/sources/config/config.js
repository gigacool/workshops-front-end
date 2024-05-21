module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/yourdb'
};