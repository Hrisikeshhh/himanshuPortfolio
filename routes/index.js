const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
  res.render('home');
})

router.get('/about',(req, res)=>{
    try{
   res.render('aboutContact')
    }catch(err){

    }
})

module.exports = router;