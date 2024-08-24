const express = require('express');
const body_parser = require('body-parser')
const passport = require('passport');
const localPassport = require('passport-local').Strategy;
const user_schema = require('./module/RstuData')
const db = require('./db');
// const { error } = require('console');
passport.use(new localPassport( async(username,password,done)=>{
    try{
        console.log('received credential ',username,password);
        const user = await user_schema.findOne({username:username})
        // console.log(user)
        if(!user)
            return done(null,false,{error :"invalid user"})
        // const ispasswordMatch = user.password === password ?true:false;
        const ispasswordMatch = await user.comparePassword(password);
        if(ispasswordMatch){
            return done(null,user)
        }else{
            return done(null,false, {message : "incorrect password"})
        }
    }catch(error){
         return done(error)
     
    }
}))
module.exports = passport;

