const nodemailer = require("nodemailer");

module.exports = async (email,subject,text) => {
    try{
        console.log("In sendMail");
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port : Number(process.env.EMAiL_PORT),
            secure : Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        });

        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        });
        console.log("Send successfully");
    } catch(err){
        console.log("Email not sent");
        console.log(err.message);
    }
}