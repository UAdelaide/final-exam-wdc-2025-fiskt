var express = require('express');
var router = express.Router();
var { getDB } = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/dogs', async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT Dogs.name AS "dog_name", Dogs.size, Users.username AS "owner_username"
      FROM Dogs
      JOIN Users on Users.user_id = Dogs.owner_id
      `);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ message: "No records found" });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/walkrequests/open', async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT WR.request_id, Dogs.name AS "dog_name", WR.requested_time, WR.duration_minutes, WR.location, Users.username
      FROM WalkRequests AS WR
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
    res.status(500).json({ message: err });
  }
});

router.get('/walkers/summary', async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT Users.username AS "walker_username", COUNT(WRs.rating) AS "total_ratings", AVG(WRs.rating) AS "average_rating", COUNT(WRs.rating) AS "completed_walks"
      FROM WalkRatings AS WRs
      JOIN Users on Users.user_id = WRs.walker_id
      GROUP BY Users.user_id
      `);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ message: "No records found" });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
