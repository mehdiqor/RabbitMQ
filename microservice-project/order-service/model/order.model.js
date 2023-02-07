const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    products : [{ _id : String}],
    userEmail : String,
    totalPrice : Number
}, {
    timestamps : true
});
const OrderModel = mongoose.model("order", OrderSchema);

module.exports = {
    OrderModel
}