const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  try{
  res.render("portfolio")
  }catch(err){
    res.status(500).send('server error');
  }
  
})






module.exports = router;