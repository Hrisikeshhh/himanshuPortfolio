const express = require('express');
const app = express();
const videosRoutes = require('./routes/videos');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')


app.use('/videos',videosRoutes);


app.listen(3000)