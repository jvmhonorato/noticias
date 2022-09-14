const express = require('express')

const router = express.Router()
const Noticia = require('../models/noticia')

router.get('/', (req, res)=> {
    res.send('noticias publicas')
})

module.exports = router