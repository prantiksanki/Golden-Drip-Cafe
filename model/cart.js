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
    
    price : 
    {
        type : Number , 
        required : true , 
    }, 
    prodURL :
    {
        type : String , 
        default : "https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/11777/Data_Plate_Fork_Knife_Food_Pie_Chart_Graph.jpg" 
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