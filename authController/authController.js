const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken')
const adminModel = require('../models/adminModel');

module.exports.signUp =async (req, res)=>{
    try{

      let {name, email, password} = req.body
      if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: 'All fields required, password min 6 chars' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 12); // salt 12, async

    const admin = await adminModel.create({
      name,
      email,
      password:hash
    });

    const token = generateToken(admin);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false in dev
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000 // 1h
    });
    res.redirect('/authorised/dashboard');
    }catch(err){
    res.status(401).send('authentication error')
    }
}


module.exports.login = async (req, res)=>{
    try{
         let{name, email, password} = req.body;

     let admin = await adminModel.findOne({email});

     if(!admin)
     {
         res.status(404).send('incorrect password or username')
     }
     else{
        bcrypt.compare(password, admin.password, async function(err, result){
            if(result)
            {
                let token = generateToken(admin)
                res.cookie('token',token,{
                    httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // false in dev
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000 // 1h
                });
            res.redirect('/authorised/dashboard')
            }
            else{
                res.redirect('/authorised/login');
            }
        })
     }
    }catch(err){
     console.error('Register error',err);
     res.status(500).json({ message: 'internal server error'})
    }
     

}