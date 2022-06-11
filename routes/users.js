const express = require('express');
const  router  = express.Router()
const   { Users , Profile}   = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require ('jsonwebtoken')
const {AuthMiddleware} = require ('../middleware/AuthToken')
const Multer = require ('../middleware/Multer')


router.post('/signup', async (req,res)=> {

    bcrypt.hash(req.body.password,10).then(hash => {
        Users.create({
            username : req.body.username,
            password : hash,
        })
        res.json("working")
    })
 .catch(error =>{
     res.json(error)
 }) 
})

router.post('/login', async (req,res)=> {
    Users.findOne({where : {username:req.body.username} })
    .then(user => {
        if(!user){return res.json({error :'username wont exist'})}

        bcrypt.compare(req.body.password,user.password)
        .then(valid => {
            if(!valid) {return res.json({error:'not valid'})}
            const AccessToken = sign({username:user.username, id: user.id},"secretKey")
            res.json(AccessToken)
        })
    })

 
 .catch(error =>{
     res.json(error)
 }) 
})

router.get('/auth', AuthMiddleware, async (req,res) => {
    res.json(req.user)
})

router.get('/userinfo/:id', async (req,res) => {
    const id = req.params.id
    const userinfo = await Users.findByPk(id , {
        attributes: { exclude: ["password"] },
    })
    res.json(userinfo)
})

router.get('/profile',AuthMiddleware, async (req,res) => {
    const userId = req.user.id
    const userprofile = await Profile.findOne({
        where: { UserId: userId },
      });
    res.json(userprofile)

})

router.post('/profile',AuthMiddleware,Multer, async (req,res) => {
    try {
        // const userId = req.params.userid
        const userinfo = {
           image : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            bio : req.body.bio
        }
       
        userinfo.UserId = req.user.id
        const info =  await Profile.create(userinfo)

    //    const info =  await Profile.update(userinfo ,{
    //     where: { UserId: userId },
    //   })
        res.json(info) 
    } catch (error) {
        console.log("error ===== ",error);
        res.json(error)  
    }
    
})



router.put('/updatepassword',AuthMiddleware,async (req,res)=> {
  const {oldPassword,newPassword} = req.body
  const user = await Users.findOne({where : {username:req.user.username} })

  bcrypt.compare(oldPassword,user.password)
  .then(valid => {
      if(!valid) {return res.json({error:'password not correct'})}
      bcrypt.hash(newPassword,10).then(hash => {
        Users.update({password:hash},{where : {username:req.user.username} })
        res.json("password updated")
        
    })
 .catch(error =>{
     res.json(error)
 }) 
  })

})

module.exports = router