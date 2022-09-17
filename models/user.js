
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
    },
    role: {
        type: [String],
        enum:['restrito', 'admin']
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

//o this referencia o contexto do function pq arrow funcion não tem contexto
UserSchema.methods.checkPassword = function(password){
    return new Promise((resolve, reject)=> {
        bcrypt.compare(password, this.password, (err, isMatch)=> {
            if(err){
                reject(err)
            }else{
              resolve(isMatch)
            }
        })
    })
   
}

const User = mongoose.model('User', UserSchema)
module.exports = User