const express = require('express');
const app = express();
const cors = require ("cors");
require('dotenv').config()

const db = require("./models");
const path = require("path")
const postRouter = require('./routes/post')
const commentsRouter = require('./routes/comments')
const usersRouter = require('./routes/users')
const likesRouter = require('./routes/likes')


app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname,'images')))

app.use("/posts",postRouter)
app.use("/comments",commentsRouter)
app.use("/auth",usersRouter)
app.use("/likes",likesRouter)



db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server is running on port 3001");
    })
})
.catch((err) => {console.log(err)})
