const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
require('./db/cons');
require('dotenv').config(); 
const Roomy = require('./models/roomysData')
const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, 'public');
const tamplates_path = path.join(__dirname, '../tamplates/views');
const partials_path = path.join(__dirname, '../tamplates/partials');

console.log(process.env.SECRET_KEY)
//use midlware for display front end
app.use(express.static(static_path));

//data json me arra to express ko samjhna chahiye
app.use(express.json())
//hamara html form hai vaha se data arra to express ko samjhna chahiye
app.use(express.urlencoded({ extended: false }))

//hame hbs use karna hai
app.set("view engine", "hbs");
app.set("views", tamplates_path);

//register partials
hbs.registerPartials(partials_path)

app.get('/', (req, res) => {
    // res.send("Hello from the other side");
    res.render('index');
})
app.get('/login', (req, res) => {
    // res.send("Hello from the other side");
    res.render('login');
})
app.get('/register', (req, res) => {
    // res.send("Hello from the other side");
    res.render('register');
})
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            //gettting html form data
            const registerRoomy = new Roomy({ //collection creation
                // db key : input name attribute value`
                name: req.body.name,
                fatherName: req.body.fatherName,
                phone: req.body.phone,
                fatherPhone: req.body.fatherPhone,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword,
                gender: req.body.gender,
                registerDate: req.body.registerDate,
                age: req.body.age,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,

            })
            //jaise hi uset register hua hum(server) use token generate karke denge
            const token = await registerRoomy.generateAuthToken();


            const registeredRoomy = await registerRoomy.save();//registration details stored in db
            res.status(201).render("index") //serveing index page after registration
        } else {
            
            // res.send("Password Dosen't Match...");
            res.render('404');
        }

    } catch (e) {
        res.status(400).send(e)
    }
})


app.post('/login', async (req,res)=>{
    try {

        //login form me diya gaya email and password hai niche ka
        const email= req.body.loginEmail;
        const password = req.body.loginPassword;
        
        const roomyObject = await Roomy.findOne({email:email}); //login form me diye gaye email se hum db ka pura object get karre
        console.log(roomyObject);
        const isMatch = await bcrypt.compare(password,roomyObject.password); //comparing form password and db password(hash vala) using bcryptjs 
        const token = await roomyObject.generateAuthToken();
        console.log("Generated token: " + token)
       if(isMatch){ //login form ka password and db me ka password match kiya
           res.status(201).render("index");
           console.log(roomyObject);
       }else{
        //    res.send("Oops! Something went wrong..")
        res.render('404');
       }
        
    } catch (e) {
        // res.status(400).send("Oops! Something went wrong..")
        res.render('404');
    }
})

/*
//how to use jsonwebtoken

const jwt = require('jsonwebtoken');
//create token

const createToken = async ()=>{
 const token = await jwt.sign({_id:'617aae27a9d09f885140cab9'},'mynameisjayiammerndevloperyoutuber',{expiresIn:"59"});
 console.log(token);

 //verifying user using token in backend
 const userVar = await jwt.verify(token,'mynameisjayiammerndevloperyoutuber');
 console.log(userVar);

}
createToken();

*/

/*
//how to use bcrypt package
const bcryptjs = require('bcryptjs');

const seccuredPassword = async (password)=>{
 const passwordHash =  await bcryptjs.hash(password,10);
 console.log(passwordHash);

// const passwordMatch = await bcryptjs.compare(password,passwordHash);
const passwordMatch = await bcryptjs.compare("jay@123",passwordHash);
console.log(passwordMatch);

}
seccuredPassword("jay@123")*/

app.listen(port, () => {
    console.log(`Live at port no ${port}`);
})