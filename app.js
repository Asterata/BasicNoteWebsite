const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');

require('dotenv').config();
// routers
const loginRouter = require('./router/login');
const loginCheckRouter = require('./router/checklogin');
const signinRouter = require('./router/signin');
const logoutRouter = require('./router/logout');
console.log('Environment Variables:', process.env);
// Functions
const getUsernameRouter = require('./router/getusername');

// Notes
const addNoteRouter = require('./router/addnote');
const deleteNoteRouter = require('./router/deletenote');
const getAllNotesRouter = require('./router/getallnotes');
const saveNoteRouter = require('./router/savenote');
const getNoteRouter = require('./router/getnote');

// db
const db = require('./db/connection');


const app = express();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = db;

const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 minutes
  expiration: 86400000, // 1 day
}, connection);

// Session middleware setup
app.use(session({
  secret: '', // cookie secret
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }
}));

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
      return next();
  } else {
      res.redirect('/login.html'); // Redirect to login page if not logged in
  }
}


app.get('/usercheckin', requireLogin, (req, res) => {
  res.sendFile(__dirname + '/frontend/usercheckin.html');
});

app.get('/mynotes', requireLogin, (req, res) => {
  res.sendFile(__dirname + '/frontend/mynotes.html');
});

// logins
app.use(loginRouter);
app.use(loginCheckRouter);

// sign in
app.use(signinRouter);

// log out
app.use(logoutRouter);

// user functions
app.use(getUsernameRouter);

// note functions
app.use(addNoteRouter);
app.use(deleteNoteRouter);
app.use(getAllNotesRouter);
app.use(saveNoteRouter);
app.use(getNoteRouter);



app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});
