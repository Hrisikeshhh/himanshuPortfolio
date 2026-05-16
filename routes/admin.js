const express = require('express');
const router = express.Router();
const videoModel = require('../models/videos')
const {signUp,login} = require('../authController/authController')
const verifyToken = require('../middleware/isLoggedIn');
const cloudinary = require('../config/cloudinary_config');

router.get('/update',(req, res)=>{
  try{
    res.render('update')
  }catch(err)
  {
    res.status(501).send('server error')
  }

})

router.get('/dashboard',verifyToken,(req,res)=>{
try{
  res.render('adminDashboard');
}
catch(err){
 res.status(501).send('server error')
}
})

router.get('/add',verifyToken,(req, res)=>{
    try{
     res.render('addProjects')
    }catch(err){
     res.status(500).send('server error')
    }
})

router.post('/addNew',async(req, res)=>{
   try{
   const file = req.files.mainVideo
  

  const mainVideo = req.files.mainVideo;
  const rawVideo = req.files.rawVideo

  const mainResult = await cloudinary.uploader.upload(
    mainVideo.tempFilePath,
  {
    resource_type: "video"
  }
);

const rawResult = await cloudinary.uploader.upload(
  rawVideo.tempFilePath,
  {
    resource_type:"video"
  }
)
  const softwareUsed = JSON.parse(req.body.softwareUsed);  
  console.log(softwareUsed); 

   let{clientName,videoName,projectCaption} = req.body
   let project = await videoModel.create({
    clientName,
    videoName,
    projectCaption,
    softwareUsed,
    mainVideo: mainResult.url,
    rawVideo:rawResult.url
   })
    
   
   res.send('done');

   }catch(err){
     res.status(501).send('database error')
     console.log(err)
   }
})

router.get('/signUp',(req,res)=>{
  try{
    res.render('signUp');
}catch(err){
     res.status(500).send('internal server error')
}
})

router.get('/login',(req, res)=>{
  try{
    res.render('login')
  }catch(err){
    res.status(500).send('internal server error');
  }

})

router.post('/login',login)

router.post('/signUp',signUp);


module.exports = router