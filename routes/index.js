const express = require("express");
const router = express.Router();
const { projects } = require("../data.json");

router.get("/", (req,res)=>{
    res.render("app");
});

router.get("/about", (req,res)=>{
    res.render("about");
});

router.get("/:id", (req, res)=>{
    try{
        const { id } = req.params;
        if( (!Number(id)) || (Number(id)>= projects.length) ){
            const error = new Error(`sorry, we could not find the path that you were looking for`);
            error.status = 404;
            throw error;
        }
        res.render("app", {id});
    }catch(error){
        res.status(error.status);
        res.render("error", {error});
    }

});

module.exports = router;