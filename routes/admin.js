const express = require('express');
const router = express.Router();
const videoModel = require('../models/videos')

router.get('/update',(req, res)=>{
  try{
    res.render('update')
  }catch(err)
  {
    res.status(501).send('server error')
  }

})

router.get('/dashboard',(req,res)=>{
try{
  res.render('adminDashboard');
}
catch(err){
 res.status(501).send('server error')
}
})

router.get('/add',(req, res)=>{
    try{
     res.render('addProjects')
    }catch(err){
     res.status(500).send('server error')
    }
})

router.post('/addNew',async(req, res)=>{
   try{
   let{clientName,videoName,projectCaption} = req.body
   const softwareUsed = JSON.parse(req.body.softwareUsed);
   
   let project = await videoModel.create({
    clientName,
    videoName,
    projectCaption,
    softwareUsed
   })
   res.send('done');

   }catch(err){
     res.status(501).send('database error')
   }
})




module.exports = router