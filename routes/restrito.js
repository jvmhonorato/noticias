const express = require('express')
const router = express.Router()


const Noticia = require('../models/noticia')


router.use((req, res, next)=> {
    if('user' in req.session){
        return next()
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