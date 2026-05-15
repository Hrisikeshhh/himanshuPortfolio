const cloudinary = require('cloudinary').v2;

    // Configuration
    cloudinary.config({ 
        cloud_name: '', 
        api_key: '', 
        api_secret: '' // Click 'View API Keys' above to copy your API secret
    });
    
    module.exports = cloudinary;