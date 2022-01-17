const express = require("express");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const data = require("./data.json");
const path = require('path');   // I don't know if I will use this or not

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
app.use("/static",express.static("public"));

app.set("view engine", "pug");

const pages = require("./routes/pages");
app.use(pages);

app.use((req, res, next)=>{
    const err = new Error(`Oh no! Your request to the path: ${req.url} could not be fulfilled. Something may have been misspelled, or the path may not exist. Please try again or return to the home menue`);
    err.status = 404;
    err.url = req.url;
    res.status(err.status);

    next(err);
});
app.use((error, req, res, next)=>{
    
    if(error.status === 404){
        res.status(error.status).render("page-not-found", { error });
    }else{
        error.message = (error.message||`Oops! It looks like something went wrong on the server.`);
        error.status = (error.status||500);
        error.url = req.url;
        res.status(error.status).render("error", { error });
    }
});





app.listen(3000, ()=>console.log("Restarting the server. Visit localhost:3000 on your browser"));







