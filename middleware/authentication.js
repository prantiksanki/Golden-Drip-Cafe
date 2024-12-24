const { createCipheriv } = require("crypto");
const {validateToken,createTokenForUser} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName)
{
    return (req,res,next) =>
    {
        const tokenCookieValue = req.cookies[cookieName] ; 

        if(!tokenCookieValue)
        {
            return next() ;
        }

        try{

            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload ;  
        }
        catch(err){

            console.error("error validating token" , err) ;
        }

        return next() ;
    }
}


module.exports = checkForAuthenticationCookie ;