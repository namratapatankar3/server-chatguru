const User = require('../models/userModel')
const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
//user registration
router.post('/register', async (req, res) => {
    try {
        const user =await User.findOne({email: req.body.email})
        if (user)
        {
          return  res.send({
                message: "User Already exists",
                success:false
            })
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPass
        const newUser = new User(req.body)

        await newUser.save()
        return  res.send({
                message: "User created successfully",
                success:true
            })
    }
    catch (error)
    {
      return  res.send({
            message: error.message,
            success:false
        })
    }
})
//User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user)
        {
          return  res.send({
                message: "User does not exists",
                success:false
            })
        }
        const validpass = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validpass) {
            return  res.send({
                message: "Invalid credentials",
                success:false
            })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, {expiresIn :"1d",})
      return  res.send({
                message: "User logged in successfully",
            success: true,
                data:token
            })
    }
    catch (error)
    {
       return res.send({
            message: error.message,
            success:false
        })
    }
})

//get user

router.get('/get-current-user', authMiddleware, async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        res.send({
            message:"user fetched successfully",
            success: true,
            data: user
        })
    }
    catch (error)
    {
return res.send({
            message: error.message,
            success:false
        })
    }
})
//get all users
router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.body.userId } })
        res.send({
            message:"user fetched successfully",
            success: true,
            data: allUsers
        })
    }
    catch (error) {
        return res.send({
            message: error.message,
            success:false
        })
    }
})
module.exports = router