const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const movieRoutes = require("./routes/movieRoute");
const userRoutes = require('./routes/userRoute');
const nodeMailer = require('nodemailer');
// const userRoute = require("./routes/userRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'../frontend')));

// app.set('views','E:/webdev/practice_mern/frontend');
app.set('views',path.join(__dirname,"../frontend"))
app.set("view engine" , 'ejs');

app.get("/",(req,res) => {
    // res.send('E:/webdev/practice_mern/frontend');
    res.render('auth');
});

app.use('/user',userRoutes);
app.use('/profile' , movieRoutes);
// app.get('/email',(req,res)=>{
//     console.log("in email");
//     const provider = nodeMailer.createTransport({
//         service:"gmail",
//         secure : true,
//         port : 465,
//         auth: {
//             user:"vasukamani.ce@gmail.com",
//             pass :"kvwf mhvl mgvu wmwa",
//         },
//         tls : {rejectUnauthorized: false}
//     });

//     const receiver = {
//         from:"vasukamani.ce@gmail.com",
//         to : "kamanivasu52@gmail.com",
//         subject : "OTP verification",
//         text:`you otp password is 4567`,
//     };

//     provider.sendMail(receiver,(error , emailResponce) => {
//         if(error){
//             res.status(422).send(error.message);
//         }else{
//             res.status(200).send("OTP send successfully");
//         }
//     })
// });
app.listen(3000);