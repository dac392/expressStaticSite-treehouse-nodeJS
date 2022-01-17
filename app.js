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
    const err = new Error(`sorry, your request could not be fulfilled`);
    err.status = 404;
    next(err);
});
app.use((error, req, res, next)=>{
    res.status(error.status);
    res.render("error", {error});
});



app.listen(3000, ()=>console.log("restarting the server"));







