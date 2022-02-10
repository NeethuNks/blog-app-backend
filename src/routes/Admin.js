const express = require('express');
const router = express.Router();
const User = require("../model/User");


//SignUp
router.post('/signup', async(req, res)=>{
    try{
        
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;