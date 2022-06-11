const express = require('express');
const  router  = express.Router()
const   { Comments }   = require('../models')
const {AuthMiddleware} = require ('../middleware/AuthToken')


//////// get post comments
router.get("/:postId", async (req,res)=> {
    try {
        const postId = req.params.postId
        const comments = await Comments.findAll({ where: { PostId: postId } })
        res.json(comments)
    } catch (error) {
        console.log("error ++++++",error);
    }
})


////// post
router.post("/",AuthMiddleware, async (req,res)=> {

    const CommentBody = req.body;
    const username = req.user.username
    CommentBody.username = username
  
    if(req.body.commentContent === ""){
      res.json({error: "empty comment"})
      
    }else {
      const comment = await  Comments.create(CommentBody);
     res.json(comment);
    }
    
  })

  router.delete("/:commentId", AuthMiddleware, async (req, res) => {
    const commentId = req.params.commentId;
  
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

  
module.exports = router;