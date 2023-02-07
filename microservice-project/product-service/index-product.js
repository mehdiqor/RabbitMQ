const { ProductRoutes } = require("./handler/product.routes");
const express = require("express");
const app = express();
require("dotenv").config();
const {PORT} = process.env;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/product", ProductRoutes);
app.use((req, res, next) => {
    return res.json({error : "NotFound"})
});
app.use((error, req, res, next) => {
    return res.json({error : error.message})
});