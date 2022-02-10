const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//SignUp
router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    User.find({ email: req.body.email }, (err, data) => {
      if (data.length == 0) {
       

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
          isAdmin:'false',
        });
        const user = newUser.save((err, data) => {
          if (err) {
            res.json({ status: "Error happend" });
          } else {
            res.json({ status: "Success" });
          }
        });
      } else {
        res.json({ status: "Email already exist" });
      }
    });
  } catch (err) {
    res.json({ status: "err" });
    //res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    
    console.log(req.body)
    const user = req.body.username
    const userPass = req.body.password

    const result = User.find({username:user},(err,data)=>{
        if(data.length>0){
            const passwordValidator = bcrypt.compareSync(userPass,data[0].password)
            console.log(passwordValidator)
            if(passwordValidator){
                //token generation
                jwt.sign({email:data[0].email,id:data[0]._id},
                    'norka',
                    {expiresIn:'1d'},
                    (err,token)=>{
                        if(err){
                            res.json({status:'Error in token generation'})
                        }
                        else{
                            res.json({status:'Login success',token:token,user})
                        }
                    })
                
            }
            else{
                res.json({status:'Invalid password'})
            }
        }
        else{
            res.json({status:'Invalid username'})
        }
    })


  } 
  catch (err) {
    res.json({status:'error'})
  }
})
module.exports = router;
