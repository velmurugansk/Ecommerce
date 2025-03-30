const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title:{
        type : String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    price:{
        type : Number,
        required:true
    },
    discountPercentage:{
        type : Number,        
    },
    rating:{
        type : Number,
        default:0
    },
    stock:{
        type : Number,
        required:true,
        default:0
    },
    brand:{
        type : String,        
    },
    category: { type: String, required: true },
    thumbnail: { type: String },
    images: [{ type: String }],
    sku: { type: String, unique: true, required: true },
    deleted: { type: Boolean, default: false },
});

module.exports = model('products', productSchema);