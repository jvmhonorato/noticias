const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')
const noticias = require('./routes/noticias')
const restrito = require('./routes/restrito')
const session = require('express-session')
const app = express()
const path = require('path')
const jsonParser = bodyParser.json()

const port = process.env.PORT || 3000
mongoose.Promise = global.Promise
const mongo = process.env.MONGODB || 'mongodb://localhost/noticias'

//STATIC FILES ASSESTS
app.use(express.static('public'))
app.use(express.static(__dirname +"public/css"));
app.use(express.static(__dirname +"public/js"));
app.use(express.static(__dirname +"public/img"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//configuração responsável por direcionar consulta a pasta view ao tipo de arquivo ejs TEMPLATE ENGINE 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')

//ROUTES
app.use(session({secret: 'fullstack-master'}))
app.get('/', (req, res)=> {
    res.render('index')
})
app.use('/restrito', (req, res, next)=> {
    if('user' in req.session){
        return next()
    }
    res.redirect('/login')
   
})

app.use('/noticias', noticias)
app.use('/restrito', restrito)
app.get('/login', (req, res)=> {
    res.render('login')
})

app.post('/login', async(req, res)=>{
 const user = await User.findOne({username: req.body.username})
 const isValid = await user.checkPassword(req.body.password)
 if(isValid){
    req.session.user=user
    res.redirect('/restrito/noticias')
 }else{
    res.redirect('/login')
 }

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





