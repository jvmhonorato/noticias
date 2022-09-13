
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    username: {
        type:String ,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


UserSchema.pre('save',function(next){
    const user = this
    
    //se ele não modificou o password, não faz nada 
    if(!user.isDirectModified('password')){
        return next()
    }
    //se modificou gera um salt e gerar um hash e reescrever o password usando o hash em seguida cham o next()
    bcrypt.genSalt((err, salt) => {
        
        bcrypt.hash(user.password ,salt, (err, hash)=>{
            user.password = hash
            next()
        })
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User