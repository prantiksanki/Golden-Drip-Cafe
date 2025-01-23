const {Router} = require("express") ; 
const router = Router() ; 
const user = require("./user")
const cart = require("../model/cart");



router.get("/cart" , async (req,res) =>
{
    const menu = await cart.find({}) ;  

    return res.render("cart" , 
        {
            items : menu , 
        }
    )
})


router.post("/cart" , (req,res)=>
{
    const cartMenu = req.body ; 
    console.log(cartMenu) ;
})




module.exports = router ;


