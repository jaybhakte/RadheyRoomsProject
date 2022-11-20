const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
// process.env.config_variable_name
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/roomysRegistration",{ useNewUrlParser: true }).then(()=>{
//     console.log("Connection succeful");
// }).catch((e)=>{
//     console.log(e,"No Connection");
// })

mongoose
.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log('Error:- ' + err));