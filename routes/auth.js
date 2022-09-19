const express = require('express')

const router = express.Router()
const User = require('../models/user')
//middleware general
router.use((req, res, next)=> {
   if('user' in req.session){
       res.locals.user = req.session.user
       res.locals.role = req.session.role
   }
   next()
})


router.get('/login', (req, res)=> {
    res.render('login')
})

router.get('/logout', (req, res)=> {
   req.session.destroy(()=>{
      res.redirect('/')
   })
   
})


router.post('/login', async(req, res)=>{
 const user = await User.findOne({username: req.body.username})
 const isValid = await user.checkPassword(req.body.password)
 if(isValid){
    req.session.user=user
    req.session.role = user.roles[0]
    res.redirect('/restrito/noticias')
 }else{
    res.redirect('/login')
 }

})

module.exports = router