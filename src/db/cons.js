const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/roomysRegistration",{ useNewUrlParser: true }).then(()=>{
    console.log("Connection succeful");
}).catch((e)=>{
    console.log(e,"No Connection");
})

