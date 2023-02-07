const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : String,
    desc : String,
    price : Number
}, {
    timestamps : true
});
const ProductModel = mongoose.model("product", ProductSchema);

module.exports = {
    ProductModel
}