const {Router} = require("express") ; 
const router = Router() ; 
const user = require("./user")
const cart = require("../model/cart");
// const checkForAuthenticationCookie = require("../middleware/authentication");
// app.use(checkForAuthenticationCookie("token")) ;
// const cookieParser = require("cookie-parser") ;

// app.use(cookieParser()) ; 

router.get("/cart", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const menu = await cart.find({ profileId: req.user._id });

    if (menu.length === 0) {
        return res.redirect("/");  // Redirect when cart is empty
    }

    return res.render("cart", {
        user: req.user,
        items: menu,
    });
});


router.post("/cart" , (req,res)=>
{
    const cartMenu = req.body ; 
    console.log(cartMenu) ;
   return res.redirect("/menu/placeorder") ;
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

        res.redirect("/cart");
        } 
        catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/placeorder", (req,res) =>
{
    return res.render("addressInput", {
        user: req.user,
    });
})

router.post("/placeorder", (req,res) =>{
    const body = req.body; 
    console.log("Order placed by : " + body) ;
    return res.redirect("/") ;
})


module.exports = router ;


