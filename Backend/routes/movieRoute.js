const express = require("express");
// const movie = require("../models/movie");
const isLoggedin = require("../middlewares/isLoggedin");
const userModel = require("../models/user");
const movieModel = require("../models/movie");
const router = express.Router();
const upload = require("../config/multerConfig");

router.get('/' , isLoggedin ,async (req,res) => {
    try{
        // console.log("hyy");
        let user = await userModel.findOne({email:req.user.email}).populate('movies');
        res.render("profile",{user});
        // console.log(users);
    } catch(err) {
        res.send(err.message);
    }
});

// router.get('/add' ,isLoggedin, (req,res) => {
//     // console.log('in add');
//     res.render('addMovie');
// })
router.post('/add',upload.single("image"),isLoggedin ,async (req,res) => {
    try{
        let user = await userModel.findOne({email : req.user.email});
        let movie =await  movieModel.create({
            image:req.file.buffer,
            user : user._id,
            title:req.body.title
        });
        // console.log(movie);
        user.movies.push(movie._id);
        await user.save();
        res.redirect("/profile");
    } catch(err) {
        res.send(err.message);
    }
})
router.get('/update/:id' , isLoggedin ,async (req,res) => {
    try{
        const movie = await movieModel.findById(req.params.id);
        if(!movie){
            return res.status(404).send("Movie not found");
        }
        res.render("update",{movie});
    }catch(err) {
        res.status(500).send(err.message);
    }
})
router.post('/update/:id',upload.single("image"), isLoggedin , async (req, res) => {
    try{
        const movie = await movieModel.findOneAndUpdate({_id:req.params.id} , {title : req.body.updatedName , image : req.file.buffer});
        res.redirect("/profile");
    } catch(err) {
        res.status(500).send(err.message);
    }
});

router.get("/delete/:id" , isLoggedin ,async (req,res) => {
    let movie = await movieModel.findOneAndDelete({_id : req.params.id});
    res.redirect("/profile");
})


module.exports = router;