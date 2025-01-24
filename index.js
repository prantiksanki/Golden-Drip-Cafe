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
const cartAdd = require("./model/cart"); 

app.set("view engine" , "ejs") ; 
app.set("views" , path.resolve("./views"))

app.use(cookieParser()) ; 
app.use(checkForAuthenticationCookie("token")) ;
app.use(express.static(path.resolve("./public"))) ;     
app.use(express.urlencoded({extended : false})) ; 
app.use(express.json());

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

app.post('/', async (req, res) => {
    const { itemId } = req.body;
    console.log('Received itemId:', itemId);

    const specificMenu = await menu.findOne({ _id: itemId });
    if (itemId) 
    {
        await cartAdd.create(
            {
                prodName : specificMenu.name , 
                prodID : itemId , 
                description : specificMenu.description ,
                price : specificMenu.price , 
                prodURL : specificMenu.image,
                profileId : req.user._id,
            }
        )
    } 
    else 
    {
        res.status(400).send('itemId not provided');
    }
});





app.listen(PORT , (req,res) =>
{
    console.log(`Server started at port ${PORT}`) ;
})