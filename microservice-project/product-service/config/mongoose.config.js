const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/product-service", (error) => {
    if(!error) return console.log("connected to the Product-Service DB!");
    console.log("Oops..! can't connect to DB");
})