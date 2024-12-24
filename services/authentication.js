const jwt = require("jsonwebtoken") ;
const secret = "Sanki@2004" ;

function createTokenForUser(user)
{
    try{
        const payload = 
        {
            _id : user._id , 
            email : user.email , 
            profileImageURL : user.profileImageURL , 
            role : user.role ,
        }; 
    
        const token = jwt.sign(payload , secret) ; 
    
        return token ;
    }
    catch{

        return null ; 
    }
  
}


function validateToken(token) 
{
    try{

        const payload = jwt.verify(token , secret) ; 
        return payload ; 
    }
    catch(err){

        console.error("Token validate failed :" , error.message) ; 
        throw new Error("Invalid or expired token") ;
    }
}


module.exports =
{
    validateToken ,
    createTokenForUser ,
} ;