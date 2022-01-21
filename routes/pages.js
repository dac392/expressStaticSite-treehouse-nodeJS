//global constants
const express = require("express");
const router = express.Router();
const { projects } = require("../data.json");

//root route
router.get("/", (req,res)=>{
    res.render("index", {projects});
});
//about route
router.get("/about", (req,res)=>{
    res.render("about", {projects});
});
//server error
router.get("/error", (req, res, next)=>{
    const error = new Error();
    error.status = 500;
    throw error;
});
//project route
router.get("/projects/:id", (req, res, next)=>{
    const { id } = req.params;
    if( projects[id] ){
        const project = projects[id];
        res.render("project", { project });
    }else{
        const error = new Error(`Oh no! Your request to the path: ${req.url} could not be fulfilled. Something may have been misspelled, or the path may not exist. Please try again or return to the home menue`);
        error.status = 404;
        error.url = req.url;
        next(error);
    }

});


module.exports = router;