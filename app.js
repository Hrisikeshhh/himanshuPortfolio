const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const mongoDB = require('./config/mongoDB-config');
const videosRoutes = require('./routes/videos');
const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(cookieParser());

app.use(fileUpload({
useTempFiles:true
}))


app.use('/',indexRoutes);
app.use('/portfolio',videosRoutes);



// protected routes
app.use('/authorised',adminRoutes)


app.listen(3000)