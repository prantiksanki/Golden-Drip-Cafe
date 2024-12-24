const {Router} = require("express")
const router = Router() ; 
const user = require("../model/user") ; 
const { cache } = require("ejs");


router.get("/signup" , (req,res) =>
{
    return res.render("signup") ;
})

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    
    // Validate if all fields are filled
    if (!email || !password || !fullName) {
        return res.render("signup", {
            error: "All fields are required.",
        });
    }

    try {
        // Check if the email already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.render("signup", {
                error: "Email already exists. Please use a different email.",
            });
        }

        // Create the new user
        await user.create({
            name: fullName,
            email,
            password,
        });

        // Redirect to login page after successful signup
        return res.redirect("/user/login");
    } catch (err) {
        console.log(err); // Log the error for debugging purposes
        return res.render("signup", {
            error: "An error occurred during signup. Please try again.",
        });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", {
            error: "All fields are required.",
        });
    }

    try {
         const token = await user.matchPasswordAndGenerateToken(email, password);

         return res
            .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
            .redirect("/");
    } 
    catch (err) 
    {
        console.error(err); 
        return res.render("login", {
            error: "Incorrect Email or Password",
        });
    }
});



router.get("/login" , (req,res) =>
{
    return res.render("login") ;
})



router.get("/logout" , (req,res) =>
{
    res.clearCookie("token").redirect("/") ;
});


module.exports = router ;