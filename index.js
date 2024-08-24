const express = require('express');
const app = express();
const db = require('./db');
const user_schema = require('./module/RstuData');
const body_parser = require('body-parser')
const passport = require('./auth')
app.use(body_parser.json())    
require('dotenv').config()

const personRoute = require('./Router/person_router')
app.use(passport.initialize())
const localAutMiddleware =passport.authenticate('local', {session : false})
app.use('/al_fajr', personRoute)
app.use(body_parser.json())
app.get('/',(req,resp)=>{
    resp.send('welcom to al_far_hotal')
})
const port = process.env.PORT || 3000
app.listen(port);

