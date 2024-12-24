const {Router} = require("express")
const router = Router() ; 

router.get("/signup" , (req,res) =>
{
    return res.render("signup") ;
})


router.get("/login" , (req,res) =>
{
    return res.render("login") ;
})

module.exports = router ;