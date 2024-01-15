const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const cors = require("cors");
const blogRoutes = require('./routes/blogs');
const userRoutes = require('../backend/routes/user')

//exp app
const app = express();

//cors
app.use(cors());

//db connrction
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
   //listening for req once we connect to db
    const port = process.env.PORT || 5000
    app.listen(port, () => console.log(`listening on port ${port} and Connected with DB!`));
})
.catch((error) => {
    console.log(error)
})

//middleware
app.use(express.json()); // for attaching req data body to the req obj

app.use((req,res,next)=>{

    console.log(req.path, req.method) //logs all your requests
    next()
})

app.use('/api/blogapi',blogRoutes)

app.use('/api/blogapi/user',userRoutes)

app.use(cookieParser());


