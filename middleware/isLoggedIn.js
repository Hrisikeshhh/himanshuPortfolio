const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const verifyToken = async (req, res, next)=>{

    try{
        const token = req.cookies.token;
        if(!token) res.status(401).redirect('/');
    
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const admin = await adminModel.findOne({_id:decoded.id})
        .select('-password');

         if(!admin){
         res.redirect('/');
    }

    req.admin = admin;
    next();
    }catch(err){
      console.error('Auth error:', err);
     res.status(401).redirect('/');
    }
   
}

module.exports = verifyToken;