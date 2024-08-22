// for AWS index.js will convert into app.js
const exp = require("constants");

const express = require("express");
const app = express();

const path = require("path");

const userroutes = require("./routes/user");
const blogroutes = require("./routes/blog");

// to deploy to aws we user environment variable we can't use particular localhost mongoose url because it will change again again in aws.
// $env:MONGO_URL="mongodb://127.0.0.1:27017/blogify"  now we can type this value into the console as it is noew dynamic
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL)
mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>{console.log("MongoDB Connected");})

const { checkforauthenticationCookie } = require("./middleware/auth");

const cookieParser = require("cookie-parser");

// const PORT = 8000
// to deploy to aws we user environment variable we can't use ports.
// means it is dyanimic so we can give the value later
// const PORT =process.env.PORT || 8000

const PORT = 8000;



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(checkforauthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))




app.use("/user",userroutes)
app.use("/blog",blogroutes)



app.listen(PORT,()=>{
    console.log("server started");
})