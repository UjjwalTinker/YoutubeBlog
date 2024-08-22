const User = require("../model/user")
const Blog = require("../model/blog")

const express = require("express");
const router = express.Router();

router.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({})
    return res.render("home",{user:req.user, blogs:allBlogs})
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.get("/signin",(req,res)=>{
    return res.render("signin")
})


router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/user/signup")
})


router.post("/signup", async(req,res)=>{
    const {fullname,email,password}= req.body;
    await User.create({
        fullname,email,password
    })
     res.redirect("./signin")
})




router.post("/signin",async (req,res)=>{
    const {email,password}= req.body;
   try {
    const token = await User.matchPasswordandgenerateToken(email,password)

    return res.cookie("token",token).redirect("./")
   } catch (error) {
    return res.render("signin",{
        error:"incorrect email or password"
    })
    
   }
})







module.exports = router;