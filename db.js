const mongoose = require('mongoose')
// const mongoURl ='mongodb://localhost:27017/al_fajr_hotal'
const MONGO_URL = process.env.MONGO_URL;

// const MONGO_URL='mongodb+srv://kaif:kaif310100@cluster0.3tbti.mongodb.net/'

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

