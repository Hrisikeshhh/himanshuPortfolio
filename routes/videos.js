const express = require('express');
const router = express.Router();
router.get('/',(req,res)=>{
  res.send("projects stuffs")
})

module.exports = router;