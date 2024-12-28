const mongoose = require("mongoose") ; 

const menuSchema = mongoose.Schema({

    prodId : {
        type : String , 
        required : true ,
    } ,
    prodName :
    {
        type : String , 
        requird : true ,
        trim : true ,
    } ,
    price : 
    {
        type : Number , 
        required : true , 
        min : 0 ,
    } ,
    imageURL:
    {
        type : String , 
        required : true , 
        trim : true , 
    },
    isAvailable :
    {
        type : Boolean , 
        dfault : true , 
    } ,
},

    { timestamps: true }
) ; 


const menuModel = mongoose.model("menu" , menuSchema) ; 

module.exports = menuModel ; 