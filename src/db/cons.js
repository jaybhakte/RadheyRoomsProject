const mongoose = require('mongoose');
const db = 'mongodb+srv://jaybhakte:Jay25012002@cluster0.uuzc3ms.mongodb.net/RoomysData?retryWrites=true&w=majority'
mongoose
.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log('Error:- ' + err));