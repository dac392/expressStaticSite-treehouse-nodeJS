const express = require("express");
const router = express.Router();
const { projects } = require("../data.json");

router.get("/", (req,res)=>{
    res.render("index", {projects});
});

router.get("/about", (req,res)=>{
    res.render("about", {projects});
});

router.get("/:id", (req, res)=>{
    try{
        const { id } = req.params;
        if( (!Number(id)) || (Number(id)>= projects.length) ){
            const error = new Error(`sorry, we could not find the path that you were looking for`);
            error.status = 404;
            throw error;
        }
        res.render("index", {projects});
    }catch(error){
        res.status(error.status);
        res.render("error", {error});
    }

});

module.exports = router;