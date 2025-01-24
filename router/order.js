const {Router} = require("express") ; 
const router = Router() ; 
const user = require("./user")
const cart = require("../model/cart");
// const checkForAuthenticationCookie = require("../middleware/authentication");
// app.use(checkForAuthenticationCookie("token")) ;
// const cookieParser = require("cookie-parser") ;

// app.use(cookieParser()) ; 


router.get("/cart" , async (req,res) =>
{
    const menu = await cart.find({ profileId : req.user._id}) ;  

    return res.render("cart" , 
        {
            user : req.user, 
            items : menu , 
        }
    )
})


router.post("/cart" , (req,res)=>
{
    const cartMenu = req.body ; 
    console.log(cartMenu) ;
    res.redirect("/placeOrder")
})




module.exports = router ;


