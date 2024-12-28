const mongoose = require("mongoose") ;


const cartSchema  = mongoose.Schema({

    prodName : {
        type : String , 
        required : true , 
    } ,
    prodID:
    {
        type : String , 
        required : true
    }  ,
    description:
    {
        type : String , 
        required : true , 
    } , 
    
    quantity : 
    {
        type : Number , 
        required : true , 
    }, 
    prodURL :
    {
        type : String , 
        default : "/images/foodPic.jpg" 
    }, 
    profileId :
    {
        type : String , 
        required : true ,
    }


}, 
{ timestamps: true }

)


const cart = mongoose.model("cart" , cartSchema) ; 

module.exports = cart ; 