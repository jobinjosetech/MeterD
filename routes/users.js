const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const newUser = new userModel({name: req.body.name ,email: req.body.email ,password: hash ,consumerId: req.body.consumerId});
        newUser.save().then((data)=>{
            if(data)
                res.send({status:true,message:'User created successfully',value:data});
            else
                res.send({status:false,message:'Error in signup',value:err});
        });
    });
});

router.post('/login',(req,res)=>{
    console.log(req.body.email);
    res.send({status:true,message:'User logged in successfully'});
    userModel.findOne({email:req.body.email}).then((data)=>{
        if(data){
            bcrypt.compare(req.body.password, data.password, function(result) {
                if(result){
                    res.send({status:true,message:'User found',value:data});
                }
                else{
                    res.send({status:false,message:'Password incorrect',value:'error'});
                }
            });
        }
        else{
            res.send({status:false,message:'User not found',value:'error'});
        }
    });
});


module.exports = router;