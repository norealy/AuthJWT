const express = require('express');
const login = require('../controllers/auth.controller');
const router = express.Router();

router.post("/signup", login.create);
router.post("/signin", login.authLogin);

module.exports = router