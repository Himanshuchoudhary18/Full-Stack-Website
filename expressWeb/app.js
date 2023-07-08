let port = 8000;
let express = require('express');
let app = express();
let path = require('path');
let cookie = require('cookie');
let auth = require('./middleware/auth');
let cookieparser = require('cookie-parser');

app.use(express.json());
// This is for using cookie parser in our website
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));



// First we have to require connection of our database of MongoDB
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/OlympicDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log('connected succesfully');
    }).catch(function (err) {
        console.log(err);
    })

// Now we will require the registers.js
let Registration = require('./models/registers')

// This is for html/css once you made the hbs/pug format then don't remove this one even you had removed html files
let staticpath = path.join(__dirname, '/public');
app.use(express.static(staticpath));

// This is for hbs file to get set
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// get to read the login file
app.get('/', function (req, res) {
    res.render('login');
})

app.post('/', async function (req, res) {
    try {
        // All these three things should be written before submit by user else it will give error
        // let name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        // let Age = req.body.Age;
        // This is how we can find the data in database
        let resultsoflogin = await Registration.findOne({ email: email });

        if (resultsoflogin.password === password) {
            let token1 = await resultsoflogin.generateAuthToken();
            console.log(token1);
            // This is how we can find the data in database
            let login = await resultsoflogin.save();
            let cookie = res.cookie('jwt', token1);
            console.log(cookie);
            res.render('index');
            // console.log(resultsoflogin);
        }
        else {
            res.send('Show error');
        }

    }
    catch (err) {
        console.log(err);
    }
})

app.get('/index', function (req, res) {
    res.render('index');
})

// This is for registering the data into MongoDB
app.post('/index', async function (req, res) {
    try {
        let login1 = new Registration({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            Age: req.body.Age
        })
        let token2 = await login1.generateAuthToken();
        console.log(token2);
        // This is how we can find the data in database
        let resultsofabout = await login1.save();
        let cookie1 = res.cookie('jwt', token2);
        console.log(cookie1);
        console.log(resultsofabout);
        res.render('index');
    }
    catch (err) {
        res.send(err);
    }
})


// About page from where data will be store in DB
app.get('/about', function (req, res) {
    res.render('about');
})

app.post('/about', async function (req, res) {
    try {
        // All these three things should be written before submit by user else it will give error

        let aboutregister = new Registration({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            Age: req.body.Age
        })
        let token = await aboutregister.generateAuthToken();
        console.log(token);
        // This is how we can find the data in database
        let resultsofabout = await aboutregister.save();
        let cookie = res.cookie('jwt', token);
        console.log(cookie);
        console.log(resultsofabout);
        res.render('index');
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
})

app.get('/weather', function (req, res) {
    res.render('weather');
})

// we will make a secret page which will open only when we have specific tokens 
app.get('/secret', auth, function (req, res) {
    // we are giving get request to it so if there it has token then only it will allow it to render secret webpage
    console.log(`This is my jwt token "${req.cookies.jwt}"`);
    res.render('secret');
})


// we will generate token to verify user whether it is same user or not
// let jwt = require('jsonwebtoken');

// let createToken = async function(){
//     let token = await jwt.sign({_id:"62c5d5b08cb3d644f8575e1c"}, "mynameisHimanshuChoudharyHowareYouTellmepleasehowareyou");
//     console.log(token);

//     // we will verify user now if it will give you id then it means it is valid user
//     let userVerify = await jwt.verify(token,"mynameisHimanshuChoudharyHowareYouTellmepleasehowareyou");
//     console.log(userVerify);
// }

// createToken();


// for logout 
app.get('/logout', auth, async function (req, res) {
    try {
        res.clearCookie('jwt');
        res.render('login');
        console.log('logout succesfully');
        let logoutresults = await req.user.save();
        console.log(logoutresults);
    }
    catch (err) {
        res.send(err);
    }
})



app.listen(port, function () {
    console.log(`listening at ${port}`);
});