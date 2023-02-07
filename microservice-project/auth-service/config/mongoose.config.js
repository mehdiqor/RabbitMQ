const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/auth-service", (error) => {
    if(!error) return console.log("connected to the Auth-Service DB!");
    console.log("Oops..! can't connect to DB");
});