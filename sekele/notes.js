let noteManager = {};

function getNotes(connection, userID) {
  const query = 'SELECT * FROM UserNotes WHERE UserID = ?';
  connection.query(query, [userID], (err, results) => {
    if (err) throw err;
    console.log('Notes for User', userID);
    results.forEach(note => {
      console.log('Note ID:', note.NoteID, ' - ', note.NoteText);
    });
  });
}


function addNote(connection, userID, noteText) {
  const query = 'INSERT INTO UserNotes (UserID, NoteText) VALUES (?, ?)';
  connection.query(query, [userID, noteText], (err, results) => {
    if (err) throw err;
    console.log('Note added successfully');
  });
}

noteManager.getNotes = getNotes;
noteManager.addNote = addNote;


module.exports = noteManager;