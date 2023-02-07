const { isAuthenticated } = require("../../isAuthenticated");
const { pushToQueue } = require("../config/rabbitMQ");
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
    } catch (error) {
        next(error)
    }
});

module.exports = {
    ProductRoutes : router
}