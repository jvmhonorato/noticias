const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
mongoose.Promise = global.Promise
const mongo = process.env.MONGODB || 'mongodb://localhost/noticias'

//STATIC FILES ASSESTS
app.use(express.static('public'))
app.use(express.static(__dirname +"public/css"));
app.use(express.static(__dirname +"public/js"));
app.use(express.static(__dirname +"public/img"));

//configuração responsável por direcionar consulta a pasta view ao tipo de arquivo ejs TEMPLATE ENGINE 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')

//ROUTES
app.get('/', (req, res)=> {
    res.render('index')
})
//CREATE USER    passa uma condicional de criação caso não tenha nenhum usuario criado ele cria um admin automaticamente
const createInitialUser = async() => {
    const total = await User.count({username: 'victorhonorato'})
    if(total ==0){
        const user = new User({
            username: "victorhonorato",
            password: "abc123"
        })
        await user.save()
        console.log('User created')
    }else{
        console.log('user created skipped')
    }
}


mongoose
.connect(mongo, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    createInitialUser()
     app.listen(port, ()=> console.log('Server running...'))
})
.catch(e => console.log(e))





