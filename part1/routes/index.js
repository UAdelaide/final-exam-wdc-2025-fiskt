var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
