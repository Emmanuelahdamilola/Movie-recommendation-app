// routes/discoverRoutes.js
const express = require('express');
const router = express.Router();
const { discoverMovies } = require('../controllers/discoverController');

router.get('/', discoverMovies); // GET /api/discover

module.exports = router;
