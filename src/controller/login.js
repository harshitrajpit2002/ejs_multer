const express=require('express');
const bcrypt=require('bcrypt');
const {sign}=require('jsonwebtoken');
const dotenv=require('dotenv');
const {user}=require('../Models/User');
dotenv.config();
const accessSecret=process.env.ACCESS_SECRET ||'';
//LOGIN FUNCTIONALITY

const login=async(req,res)=>{
    const {username,password}=req.body;

    //validate user input
    if(!username ||!password)
    {
        res.status(400).send('missing username or password');
        return ;
    }
    //find user from database
    const User=await user.findOne({username});
    if(!User)
    {
        res.status(400).send('user not found');
        return;
    }
    // compare with email with email from the database
    if(User.email!=req.body.email)
    {
        res.status(400).send('Invalid email');
    }
    //check password
    const validPassword=await bcrypt.compare(password,User.password);
    if (!validPassword) {
        res.status(400).send('Invalid password')
    }

    const accesstoken=sign({id:User._id},accessSecret);
    res.cookie('accesstoken', accesstoken, { httpOnly: true, secure: true });


    //send token in header
    res.header('Authorization',`Bearer ${accesstoken}`)
    console.log('user logged in');
    res.status(200).json({User,accesstoken});

}
module.exports=login;

