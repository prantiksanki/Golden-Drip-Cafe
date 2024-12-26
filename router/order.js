const {Router} = require("express") ; 
const router = Router() ; 



router.get("/cart" , (req,res) =>
{
    return res.render("cart")
})





module.exports = router ; 
