
const{createHmac,randomBytes}= require("crypto")
const mongoose = require("mongoose");
const { createToken } = require("../services/auth");


const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileimageURL:{
        type:String,
        default:"/defalut.jpg",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},{timestamps:true})


// crypto has to use has 
// bootstrap for header footer and navbar

// middleware use to hash the password
userSchema.pre("save", function(next) {
    const user = this;
    if (user.isModified("password")){   
    // random 16 digit key
    const salt = randomBytes(16).toString("hex");
    // algorithm , key used to hash , password to update
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex")  
    user.salt= salt;
    user.password= hashedPassword
    }
    next();
})


userSchema.static("matchPasswordandgenerateToken", async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("user not found")
    const salt = user.salt;
    const hashedPassword = user.password;

    const userhash  = createHmac("sha256",salt)
    .update(password)
    .digest("hex")  

    if(hashedPassword!== userhash)throw new Error("incorrect password");
    
    const token = createToken(user);
    return token

})



const User = mongoose.model("User",userSchema)


module.exports= User;