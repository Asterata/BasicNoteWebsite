const mysql = require('mysql');

// Create connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'NotesDB'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Function to add a new note for a user
function addNote(userID, noteText) {
  const query = 'INSERT INTO UserNotes (UserID, NoteText) VALUES (?, ?)';
  connection.query(query, [userID, noteText], (err, results) => {
    if (err) throw err;
    console.log('Note added successfully');
  });
}

// Function to retrieve all notes for a user
function getNotes(userID) {
  const query = 'SELECT * FROM UserNotes WHERE UserID = ?';
  connection.query(query, [userID], (err, results) => {
    if (err) throw err;
    console.log('Notes for User', userID);
    results.forEach(note => {
      console.log('Note ID:', note.NoteID, ' - ', note.NoteText);
    });
  });
}

