const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
const Article = require("../model/Article");
const User = require('../model/User');
const jwt = require("jsonwebtoken");


//Create article
router.post('/', async(req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    
    const newArticle = new Article(req.body)
    
    // jwt.verify(req.headers.token,'norka',(err,decoded)=>{
    //     if(decoded){
    //         console.log(req.body)
    //         res.send('Authorised User')
    //         if(req.body.username=='admin'){
    //             res.status(200).json("Article Added.");
    //         }
    //         else{
    //             res.status(403).json("Only Admin Can Add Articles.");
    //         }
            
    //     }
    //     else{
    //         res.send('Unauthorised user')
    //     }
    // })
    
    try{
        
        const savedArticle = await newArticle.save();
        res.status(200).json(savedArticle);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Update article
router.put('/:id', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    //try{
        const article = await Article.findById(req.params.id);
        //if(article.username === req.body.username) {
            try{
                const updatedArticle = await Article.findByIdAndUpdate(
                    req.params.id,{
                        $set:req.body,
                },
                {new:true});
                res.status(200).json(updatedArticle);

            }
            catch(err){} 
    //     }
    //     else{
    //         res.status(401).json("You can't have the permission to update");
    //     }
       
    // }
    // catch(err){
    //     res.status(500).json(err);
    // }
});

//Delete article
router.delete('/:id', async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    //try{
        const article = await Article.findById(req.params.id);
        //if(article.username === req.body.username){
            try{
                await article.delete();
                res.status(200).json("Article has been deleted");
            }
            catch(err){
                res.status(500).json(err);
            }
        //}
        // else{
        //     res.status(401).json("You can't have permission to delete");
        // }
    //}
    // catch(err){
    //     res.status(500).json(err);
    // }
});

//Get single article
router.get('api/:id',async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try{
        const article = await Article.findById(req.params.id);
        res.status(200).json(article);
    }
    catch(err){
        res.status(500).json(err);

    }
});

//Get all articles
router.get('api/',async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try{
        const article = await Article.find();
        res.status(200).json(article);
    }
    catch(err){
        res.status(500).json(err);

    }
});

module.exports = router;