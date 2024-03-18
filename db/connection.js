const mysql = require('mysql2');

// MySQL connection options
const dbOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'notesdb',
};
  
const connection = mysql.createConnection(dbOptions);

connection.connect(function(err) {
  if (err) {
      console.error('Error connecting to MySQL:', err.stack);
      return;
  }
  console.log('Connected to MySQL as id', connection.threadId);
});

module.exports = connection;
