const mysql = require('mysql2');

// Create MySQL connection
// MySQL connection options
const dbOptions = {
  host: '',
  user: '',
  password: '',
  database: '',
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
