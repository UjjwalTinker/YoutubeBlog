const { validate } = require("../services/auth")

function checkforauthenticationCookie(cookiename){
    return (req,res,next)=>{
        const tokencookievalue= req.cookies[cookiename]
        if(!tokencookievalue){  return next()}
        const userpayload = validate(tokencookievalue)
        req.user = userpayload;
       return next();
    }   
}




module.exports = {
    checkforauthenticationCookie
}