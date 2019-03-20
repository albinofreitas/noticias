const express = require('express')

const Noticia = require('../models/noticia')

const router = express.Router()

router.use((req, res, next) => {
    if('user' in req.session){
        if(req.session.user.roles.indexOf('admin') >= 0){
            return next()
        }else{
            res.redirect('/')
        }
    }
    res.redirect('/login')
})

router.get('/noticias', async (req, res) => {
    const noticias = await Noticia.find()
    res.render('noticias/admin', { noticias })
})

module.exports = router