const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser"); 
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const router = require("./Routes/routers");
const {connectDatabase} = require("./database/connectDatabase");

const app = express();

// Config 
dotenv.config({
    path: "./config/env/config.env",
});


//Flash Middlewares
app.use(cookieParser("passport"));
app.use(session({ 
    cookie: { maxAge: 90000000 },  
    resave:true,
    secret:"miraccumbur",
    saveUninitialized:true
})
);
app.use(flash());

//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());


//Global - Res.Locals - Middlewares
app.use((req,res,next)=>{
    //res.locals.flashSuccess = req.flash("flashSuccess");

    //Passport Flash
    res.locals.passportFailure = req.flash("error");
    res.locals.passportSuccess = req.flash("success");
    res.locals.addAItemCartSuccess = req.flash("flashAdAItemToCart");
    
    res.locals.user = req.user;
    next();
})
// Connect Database
connectDatabase();
// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Temple Engine
app.engine('handlebars',exphbs({defaultLayout: 'mainLayout'}));
app.set('view engine', 'handlebars');

// Router Midlleware
app.use(router);

//Get Main Page
app.get("/",(req,res,next)=>{
    res.render("pages/index");
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); 
});
