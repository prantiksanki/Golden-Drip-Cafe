const express = require("express") ; 
const app = express() ; 
const path = require("path");
const PORT = 80 ; 
const userRoute = require("./router/user") ;
app.set("view engine" , "ejs") ; 
app.set("views" , path.resolve("./views"))


app.use(express.static(path.resolve("./public"))) ;     // content of public folder can serve statically
app.use(express.urlencoded({extended : false})) ; 

app.use("/user" , userRoute) ;


app.get("/" , (req,res) =>
{
    return res.render("home") ;
})




app.listen(PORT , (req,res) =>
{
    console.log(`Server started at port ${PORT}`) ;
})