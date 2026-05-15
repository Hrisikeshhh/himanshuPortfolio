const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const mongoDB = require('./config/mongoDB-config');
const videosRoutes = require('./routes/videos');
const adminRoutes = require('./routes/admin');



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.use(fileUpload({
useTempFiles:true
}))

app.use('/portfolio',videosRoutes);
app.use('/authorised',adminRoutes)


app.listen(3000)