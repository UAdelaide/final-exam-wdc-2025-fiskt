const express = require('express');
const path = require('path');
require('dotenv').config();

const session = require('express-session');

const app = express();

app.use(session({
  secret: "session secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/login-user', (req, res) => {
    const { user_id, username, role } = req.body;
    req.session.user = {
        session_uid: user_id,
        session_username: username,
        session_role: role
    };

    if (req.session.user) {
        res.status(200);
    } else {
        res.status(500);
    }
});

app.post('/logout-user', (req, res) => {
    const { user_id, username, role}
})

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;
