const express = require("express") ; 
const app = express() ; 
const path = require("path");
const PORT = 80 ; 
const userRoute = require("./router/user") ;
const menuOrderRoute = require("./router/order")
const mongoose = require("mongoose") ;
const cookieParser = require("cookie-parser") ;
const checkForAuthenticationCookie = require("./middleware/authentication");

app.set("view engine" , "ejs") ; 
app.set("views" , path.resolve("./views"))

app.use(cookieParser()) ; 
app.use(checkForAuthenticationCookie("token")) ;
app.use(express.static(path.resolve("./public"))) ;     // content of public folder can serve statically
app.use(express.urlencoded({extended : false})) ; 

mongoose.connect("mongodb://localhost:27017/Golden_Drip_Cafe")  
.then(e => console.log("MongoDB is connected")) ; 

app.use("/user" , userRoute) ;
app.use("/menu" , menuOrderRoute) ; 

app.get("/" , (req,res) =>
{
    return res.render("home") ;
})




app.listen(PORT , (req,res) =>
{
    console.log(`Server started at port ${PORT}`) ;
})