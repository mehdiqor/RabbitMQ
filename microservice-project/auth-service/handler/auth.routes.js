const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/register", async(req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const existUser = await UserModel.findOne({email});
        if(existUser) throw {message : "User already exists!!"};
        const newUser = await UserModel.create({
            name, email, password
        });
        await newUser.save();
        return res.json({
            message : "new user created",
            newUser
        })
    } catch (error) {
        next(error)
    }
});
router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const existUser = await UserModel.findOne({email}, {__v : 0});
        if(!existUser) throw {message : "user not found!"};
        if(existUser.password !== password) throw {message : "email or password is incorrect"};
        delete existUser.password;
        jwt.sign({
            email,
            id : existUser._id,
            name : existUser.name
        },
        "secretKey",
        (err, token) => {
            if(!err) return res.json({token});
            return res.json({error : err.message});
        });
        await UserModel.bulkSave();
        return res.json({
            message : "new user created",
            newUser
        })
    } catch (error) {
        next(error)
    }
});

module.exports = {
    AuthRoutes : router
}