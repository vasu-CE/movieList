const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
// const { model } = require("mongoose");

module.exports = async function(req,res,next) {
    if(!req.cookies.token) {
        return res.status(401).send("You need to login first");
        // return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(req.cookies.token , "vasu");
        let user = await userModel.findOne({email : decoded.email})
        .select("-password");

        req.user = {
            _id:user._id,
            name : user.name,
            email : user.email
        };
        // console.log("done");
        next();
    } catch(err) {
        console.log(req.cookies.token)
        return res.status(500).send("Something went wronh");
        // res.redirect("/");
    }
    // console.log(req.cookies.token);
   
};