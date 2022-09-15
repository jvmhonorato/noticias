const express = require('express')
const router = express.Router()


const Noticia = require('../models/noticia')

router.get('/', (req, res)=> {

    res.send('restrito')
})


router.get('/noticias', async(req, res)=> {
    const noticias = await Noticia.find({category: 'private'})
    res.render('noticias/restrito',{noticias})
})

module.exports = router