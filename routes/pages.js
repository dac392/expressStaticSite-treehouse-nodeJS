const express = require("express");
const router = express.Router();
const { projects } = require("../data.json");
const regex = new RegExp(`^[0-${projects.length-1}]$`);

router.get("/", (req,res)=>{
    res.render("index", {projects});
});

router.get("/about", (req,res)=>{
    res.render("about", {projects});
});

router.get("/:id", (req, res)=>{
    try{
        const { id } = req.params;
        const match = regex.test(id)
        if( !match ){
            const error = new Error(`sorry, we could not find the path that you were looking for, redirecting to the main page.`);
            error.status = 303;
            throw error;
        }
        const project = projects[id];
        res.render("project", { project });
    }catch(error){
        console.log(error.message);
        res.status(error.status);
        res.redirect("/");
    }

});

module.exports = router;