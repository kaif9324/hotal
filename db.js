const mongoose = require('mongoose')
// const mongoURl ='mongodb://localhost:27017/al_fajr_hotal'
const mongoURl = process.env.mongoUrl
mongoose.connect(mongoURl,{
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

