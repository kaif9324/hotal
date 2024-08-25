const mongoose = require('mongoose')
// const mongoURl ='mongodb://localhost:27017/al_fajr_hotal'
// const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL='mongodb+srv://akaif595:XAFntEq3L1OfYdSX@cluster0.3tbti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const MONGO_URL='mongodb+srv://akaif595:XAFntEq3L1OfYdSX@cluster0.3tbti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
require('dotenv').config(); // Ensure this is included
mongoose.connect(MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('database connected')
})
db.on('error',(error)=>{
    console.log('error',error)
})
db.on('disconnected',()=>{
    console.log('disconnected')
})


module.exports = db;

