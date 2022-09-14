const express = require('express')

const router = express.Router()
const User = require('../models/user')


router.get('/login', (req, res)=> {
    res.render('login')
})

router.post('/login', async(req, res)=>{
 const user = await User.findOne({username: req.body.username})
 const isValid = await user.checkPassword(req.body.password)
 if(isValid){
    req.session.user=user
    res.redirect('/restrito/noticias')
 }else{
    res.redirect('/login')
 }

})

module.exports = router