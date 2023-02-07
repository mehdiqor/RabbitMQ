const { OrderRoutes } = require("./handler/order.routes");
const express = require("express");
const { createOrderWithQueue } = require("./config/rabbitMQ");
const app = express();
require("dotenv").config();
const {PORT} = process.env;
require("./config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
createOrderWithQueue("ORDER");
app.use("/order", OrderRoutes);
app.use((req, res, next) => {
    return res.json({error : "NotFound"})
});
app.use((error, req, res, next) => {
    return res.json({error : error.message})
});
app.listen(PORT, () => {
    console.log("Order-Service running over port: ", PORT);
});