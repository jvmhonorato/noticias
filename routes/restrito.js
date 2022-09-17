const express = require('express')
const router = express.Router()


const Noticia = require('../models/noticia')


router.use((req, res, next)=> {
    //check if user is logged
    if('user' in req.session){
        //check if has a 'restrito' roles  on user
        if(req.session.user.roles.indexOf('restrito')>=0){
            return next()
        }else{
            res.redirect('/')
        }
        
    }
    res.redirect('/login')
   
})

router.get('/', (req, res)=> {

    res.send('restrito')
})


router.get('/noticias', async(req, res)=> {
    const noticias = await Noticia.find({category: 'private'})
    res.render('noticias/restrito',{noticias})
})

module.exports = router