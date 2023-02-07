const { AuthRoutes } = require("./handler/auth.routes");
const express = require("express");
const app = express();
require("dotenv").config();
const {PORT} = process.env;
require("./config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/auth", AuthRoutes);
app.use((req, res, next) => {
    return res.json({error : "NotFound"})
});
app.use((error, req, res, next) => {
    return res.json({error : error.message})
});
app.listen(PORT, () => {
    console.log("Auth-Service running over port:", PORT);
});