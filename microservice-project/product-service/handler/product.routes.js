const { pushToQueue, createQueue } = require("../config/rabbitMQ");
const { isAuthenticated } = require("../../isAuthenticated");
const { ProductModel } = require("../model/product.model");
const router = require("express").Router();

router.post("/create", async (req, res, next) => {
    try {
        const {name, desc, price} = req.body;
        const newProduct = new ProductModel({
            name,
            desc,
            price
        });
        await newProduct.save();
        return res.json({
            message : "new product created",
            newProduct
        });
    } catch (error) {
        next(error)
    }
});
router.post("/buy", isAuthenticated, async (req, res, next) => {
    try {
        const {productIDs = []} = req.body;
        const products = await ProductModel.find({_id : {$in : productIDs}});
        const {email} = req.user;
        await pushToQueue("ORDER", {products, userEmail : email});
        const {channel, queueDetail} = await createQueue("PRODUCT");
        channel.consume("PRODUCT", msg => {
            console.log(JSON.parse(msg.content.toString())); //push to res
            console.log(queueDetail);
            channel.ack(msg);
        });
        return res.json({
            message : "Your order has been registered"
        });
    } catch (error) {
        next(error)
    }
});

module.exports = {
    ProductRoutes : router
}