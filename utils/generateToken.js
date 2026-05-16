const jwt = require('jsonwebtoken');

const generateToken = (admin)=>{
return jwt.sign({id:admin._id, email:admin.email},process.env.JWT_KEY);
}

module.exports.generateToken = generateToken;