const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const videoSchema =  mongoose.Schema({
    mainVideo:{
       type:String
    },
    rawVideo:{
     type: String
    },
    clientName:String,
    videoName:String,
    projectCaption:String,
    softwareUsed:[String]
})

module.exports = mongoose.model('video',videoSchema)