const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectID,
        require:true,
        ref:'user',
        unique : true,
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5
    }
});

module.exports = mongoose.model("token" , tokenSchema);