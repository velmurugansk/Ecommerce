const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model =mongoose.model;

const cartSchema = new Schema({
    "userId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            productIdString: { type: String, required: true },
            quantity: Number,
            name: String,
            price: Number
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
    totalPrice: { type: Number, default: 0 },
    modifiedOn: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true })

module.exports = model('carts', cartSchema);