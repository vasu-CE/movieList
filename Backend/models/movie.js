const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    image : Buffer
});

module.exports = mongoose.model("Movie",movieSchema);