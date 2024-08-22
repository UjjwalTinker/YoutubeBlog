const Blog = require("../model/blog")
const multer = require("multer");
const express = require("express");
const path = require("path")
const router = express.Router();

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.resolve(`./public/uploads`))
    },
    filename:function(req,file,callback){
        const filename = `${Date.now()} - ${file.originalname}`
        callback(null,filename)
    }
})

const upload = multer({storage:storage})


router.get("/add",(req,res)=>{
    return res.render("addBlog",{user:req.user})
})

router.get("/:id",async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    return res.render("blog",{
        user:req.user,
        blog,
    })
})



router.post("/", upload.single("coverImage"), async (req,res)=>{
    const{title,body}= req.body
  const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id ,
        coverImageURL:`/uploads/${req.file.filename}`
    })
   return res.redirect("/user")
})




module.exports= router;