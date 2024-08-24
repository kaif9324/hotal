const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Resturent_Scema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    fami_num:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

Resturent_Scema.pre('save', async function(next){
    const person = this
    if(!person.isModified('password')) return next()
    try{
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(person.password,salt);
        person.password =hashpassword;
        next();
    }catch(err){
        return next()
    }
})

Resturent_Scema.methods.comparePassword = async function(condidatePassword){
   try{
    const isMatch = await bcrypt.compare(condidatePassword,this.password)
    return isMatch;
   }
   catch(err){
    throw err;

   }
}
const user_schema = mongoose.model('al_fajr_data',Resturent_Scema)
module.exports=user_schema;
