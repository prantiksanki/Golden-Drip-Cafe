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
    res.redirect("/placeOrder") ;
})

router.post("/cart/remove", async (req, res) => {
    try {
        const { itemName} = req.body;  
        console.log("Item to remove:", itemName , " from user : " , req.user._id);

         if (!itemName || typeof itemName !== "string") {
            return res.status(400).json({ error: "Invalid or missing itemId" });
        }

         const removedItem = await cart.findOneAndDelete({
            prodName: itemName,
            profileId: req.user._id,  
        });

         if (!removedItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

         res.status(200).json({ message: "Item removed successfully", removedItem });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router ;


