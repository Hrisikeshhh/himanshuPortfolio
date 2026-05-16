const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model('admin',adminSchema);