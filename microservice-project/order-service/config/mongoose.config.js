const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/order-service", (error) => {
    if(!error) return console.log("connected to the Order-Service DB!");
    console.log("Oops..! can't connect to DB");
})