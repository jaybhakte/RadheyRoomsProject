const jwt = require('jsonwebtoken');
const Owner = require('../models/owenerData');
const cookieParser = require('cookie-parser');

const authowner = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt; //geting cookies 
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY); //verify same user using secret key
        // console.log(verifyUser);

        const user = await Owner.findOne({_id:verifyUser._id}); //get roomyobject using id
        console.log(user)

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log("Error",e,18)
        res.status(401).send(e);
    }

}

module.exports = authowner;