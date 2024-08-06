const express = require("express");
const userModel = require("../models/user"); // Ensure correct path to userModel
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");
const isLoggedin = require("../middlewares/isLoggedin");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let newUser = new userModel({
            name,
            email,
            password: hash
        });
        user = await newUser.save();

        const token = jwt.sign({email:newUser.email},"vasu");
        res.cookie("token",token);

        console.log("Sign up successfully");
        res.redirect('/profile');
    } catch (err) {
        console.error("Error in signup:", err);
        res.status(500).send("Error in signup");
    }
});

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    let user =await userModel.findOne({email});
    if(!user) {
        res.send("You need to sign up first!!!");
    }
    const match = await bcrypt.compare(password , user.password);
    if(!match){
        res.send("Something went wrong");
    }
    const token = await jwt.sign({email:user.email},"vasu");
    res.cookie("token",token);
    console.log("Login successfully");
    res.redirect("/profile");
    // res.render('profile' , {user});
})

router.post("/logout" , isLoggedin ,async (req,res) => {
    res.cookie("token","");
    res.render("auth");
})

module.exports = router;
