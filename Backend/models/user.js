const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie');

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false
    },
    movies : [
        {type : mongoose.Schema.Types.ObjectId , ref:"Movie"}
    ]    
});

module.exports = mongoose.model("userModel" , userSchema);