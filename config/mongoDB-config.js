const mongoose = require('mongoose');
const dotenv = require('dotenv').config;
mongoose.connect(`${process.env.MONGODB_URI}/editorPortfolio`)
.then(()=>{
 console.log('connected')
})
.catch((err)=>{
 console.log('db connection error',err);
})

module.exports = mongoose.connection;