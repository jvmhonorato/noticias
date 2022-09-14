const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> res.send('restrito'))
router.get('/noticias', (req, res)=> res.send('noticias restritas'))

module.exports = router