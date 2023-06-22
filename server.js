const express=require('express');
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbconfig")
const userRouter = require('./routes/usersRoute')
const chatsRouter = require('./routes/chatsRoute')
app.use(express.json())
app.use("/api/users", userRouter)
app.use("/api/chats", chatsRouter )
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server is running on port ${port}`))
