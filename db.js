const mongoose = require('mongoose')
// const mongoURl ='mongodb://localhost:27017/al_fajr_hotal'
const mongoURl ='mongodb+srv://akaif595:XAFntEq3L1OfYdSX@cluster0.3tbti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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

