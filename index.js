const express = require("express") ; 
const app = express() ; 
const path = require("path");
const PORT = 800 ; 
const userRoute = require("./router/user") ;
const menuOrderRoute = require("./router/order")
const mongoose = require("mongoose") ;
const cookieParser = require("cookie-parser") ;
const checkForAuthenticationCookie = require("./middleware/authentication");
const menu = require("./model/menu") ;

app.set("view engine" , "ejs") ; 
app.set("views" , path.resolve("./views"))

app.use(cookieParser()) ; 
app.use(checkForAuthenticationCookie("token")) ;
app.use(express.static(path.resolve("./public"))) ;     
app.use(express.urlencoded({extended : false})) ; 

mongoose.connect("mongodb://localhost:27017/Golden_Drip_Cafe")  
.then(e => console.log("MongoDB is connected")) ; 

app.use("/user" , userRoute) ;
app.use("/menu" , menuOrderRoute) ; 

app.get("/" , async (req,res) =>
{
    const menuItems = await menu.find({});
    res.render("home", { 
        user : req.user ,
        menuItems })  ;


})

app.post("/" , (req,res) =>
{
    console.log(req.body) ;
    res.send("Menu Order Received") ; 
})




app.listen(PORT , (req,res) =>
{
    console.log(`Server started at port ${PORT}`) ;
})