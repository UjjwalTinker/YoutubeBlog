const jwt = require("jsonwebtoken");
const Secret ="UjjwalTinker"


function createToken(user){
    const token = jwt.sign({  _id:  user._id,
        email: user.email,
        profileimageURL:user.profileimageURL,
        role:user.role,},Secret)
    return token;
}



function validate(token){
    const payload =jwt.verify(token,Secret)
    return payload;
}



module.exports={
    createToken,
    validate,
}