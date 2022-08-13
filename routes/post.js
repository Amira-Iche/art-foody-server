const express = require('express');
const  router  = express.Router()
const   { Posts ,Likes  }   = require('../models')
const {AuthMiddleware} = require ('../middleware/AuthToken');
const Multer = require('../middleware/Multer');



////// get All Posts
router.get("/", async (req,res)=> {
    const allPost = await Posts.findAll({ include: [Likes]})
    res.json(allPost)
})

//////// get one post
router.get("/byId/:id", async (req,res)=> {
    try {
        const id = req.params.id
        const post = await Posts.findOne({ 
            where: { id: id },
            include: [Likes] })
        res.json(post)
    } catch (error) {
        console.log("error ++++++",error);
    }
    
})

////// Create a post
router.post("/",AuthMiddleware,Multer, async (req,res)=> {
   try {
       const PostBody = {
        title : req.body.title,
        postText : req.body.postText,
        username : req.user.username,
        UserId : req.user.id
    }
  
        if (req.file){
            PostBody.image = req.file.path
        // PostBody.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
     const post = await Posts.create(PostBody)
     res.json(post)  

   } catch (error) {
       console.log("error ++++++",error)
       res.json(error)
   }
    
    
  
   
  })


//////// get user posts
router.get("/byuserId/:id", async (req,res)=> {
    try {
        const id = req.params.id
        const posts = await Posts.findAll({
            where: {UserId: id},
            include: [Likes],
        })
        res.json(posts)
    } catch (error) {
        console.log("error ++++++",error);
    }
    
})

//////// edit one post
router.put("/byId/:id",Multer, async (req,res)=> {
    try {
    //    const PostBody = req.body;
    const PostBody = {
        image : req.file.path,
        title : req.body.title,
        postText : req.body.postText
    }
       await  Posts.update(PostBody, { where: { id: req.params.id} });
     res.json(PostBody); 
    } catch (error) {
        console.log("error ===== ",error);
    }
    
  })

//////// Delete one post
router.delete("/byId/:id", async (req,res)=> {
    try {
        const id = req.params.id
         await Posts.destroy({ where: { id: id } })
        res.json("delete")
    } catch (error) {
        console.log("error ++++++",error);
    }
    
})






module.exports = router


