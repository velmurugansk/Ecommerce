const carts = require('../models/cartModels');

const getCart = async (req, res) => {
    const { userId } = req.query;    
    try {
        const cartdata = await carts.findOne({ userId });
        if (!cartdata) {
            return res.status(200).json({ "status": true, "message": "Your cart is empty!" });
        }
        res.status(200).json({ "status": true, "data": cartdata });
    } catch (error) {
        res.status(404).json({ "status": false, "message": "Product not found!" });
    }
};

const addtoCart = async (req, res) => {
    const { userId, quantity, name, price, productId, productIdString } = req.body.params;    
    try {
        let cartdata = await carts.findOne({ userId }); // Ensure cartdata is mutable        
        if (!cartdata) {
            const newCart = new carts({
                userId,
                products: [{ name, quantity, productId, price, productIdString }]
            });
            newCart.totalPrice = newCart.products.reduce((total, item) => total + item.price * item.quantity, 0);
            await newCart.save();
            return res.status(200).json({ status: true, message: "Item added to cart!" });
        }
        
        const existingProductIndex = cartdata.products.findIndex(
            (item) => item.productIdString === productId.toString() // removed parseInt. If productId is objectID, this is correct.
        );
        
        if (existingProductIndex !== -1) {
            cartdata.products[existingProductIndex].quantity += quantity;
        } else {
            cartdata.products.push({ productId, quantity, name, price, productIdString });
        }
        cartdata.totalPrice = cartdata.products.reduce((total, item) => total + item.price * item.quantity, 0);
        await cartdata.save(); // Save the cartdata document
        res.status(200).json({ status: true, message: "Item added to cart!" });

    } catch (error) {
        console.log(error); // it is very useful to log the error.
        res.status(404).json({ status: false, message: "Product not found!" });
    }
};

module.exports = { getCart, addtoCart };