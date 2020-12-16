const express = require('express');
const verifyToken = require('../middleware/verityToken');
const router = express.Router();

router.get('/',verifyToken,(req,res)=>{
     res.json("OK");
})

module.exports = router;
