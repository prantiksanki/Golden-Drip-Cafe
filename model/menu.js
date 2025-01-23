const mongoose = require('mongoose');

const menuSchema = mongoose.Schema(
{
    name: {
        type: String, 
        required: true,
    },
    price: 
    {
        type : Number,
        required: true,
    },
    category: 
    {
        type : String , 
        required: true,
        enum: ['Starters', 'Main Course', 'Dessert', 'Beverage']
    },
    description:
    {
        type: String,
        required: true,
    },
    quantity:
    {
        type: String,
        required: true,
        default: 0,
    } ,
    image:
    {   
        type: String,
        required: true,
        default: 'https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/11777/Data_Plate_Fork_Knife_Food_Pie_Chart_Graph.jpg'
    },

},
{
    timestamps: true,
});

const menu = mongoose.model('menu' , menuSchema) ;

module.exports = menu ; 
