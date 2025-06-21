var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mysql = require('mysql2/promise');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


let db;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Set your MySQL root password
    });

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

app.get('/api/dogs', async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT Dogs.name as "dog_name", Dogs.size, Users.username as "owner_username"
      FROM Dogs
      JOIN Users on Users.user_id = Dogs.owner_id
      `);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ message: "No records found" });
    }
  } catch(err) {
    res.status(500).json({ message: "Request error" });
  }
});

app.get('/api/walkrequests/open', async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT WR.request_id, Dogs.name as "dog_name", WR.requested_time, WR.duration_minutes, WR.location, Users.username
      FROM WalkRequests as WR
      JOIN Dogs on Dogs.dog_id = WR.dog_id
      JOIN Users on Users.user_id = Dogs.owner_id
      WHERE WR.status = "open"
      `);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(500).json({ message: "No records found" });
    }
  } catch(err) {
    res.status(500).json({ message: "request error" });
  }
});

app.get('/api/walkers/summary', async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT Users.username as "walker_username", COUNT(WRs.rating) as "total_ratings", AVG(WRs.rating) as "average_rating", COUNT(WRs.rating) as "completed_walks"
      FROM WalkRatings as WRs
      JOIN Users on Users.user_id = WRs.walker_id
      GROUP BY Users.user_id
      `);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ message: "No records found" });
    }
  } catch(err) {
    res.status(500).json({ message: "request error" });
  }
});

module.exports = app;
