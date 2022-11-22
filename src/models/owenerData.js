const mongoose = require('mongoose');
require('dotenv').config();  
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const OwnerSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cpassword:String,
    tokens:[{
        token:{
            type:String,
            required:true
        },
    }]
});

//generating token
OwnerSchema.methods.generateAuthToken = async function(){
    try {
        //generate token 
        console.log(this._id,19);
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        console.log("Token ji...",token,25)
        this.tokens = this.tokens.concat({token:token}); //humne gnerate kiya hua token us tokens arry of object ke token object me set karee
        //add token into db
        await this.save(); 
        console.log(token);
        return token;
    } catch (e) {
        res.send(e);
        console.log("Ye dekh eroor bhai: ",e,33);
    }
}

//hasing midlware
OwnerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log(`The current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`The current password is ${this.password}`);
        
        // this.cpassword = undefined; //pasword hash hone ke bad iski jarurat nahi 
        this.cpassword = await bcrypt.hash(this.password, 10); //pasword hash hone ke bad iski jarurat nahi 

    }
    next();
})

module.exports = OwnerModel =  mongoose.model('ownerModel', OwnerSchema);