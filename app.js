const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://meterd:Proxy@cluster0.w3hyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user',userRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000,()=>{
    console.log('server started');
})