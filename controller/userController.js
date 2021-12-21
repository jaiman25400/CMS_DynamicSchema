const User = require('../schema/userModel');
const generateToken = require('../utils/generateToken');

exports.getAllUsers = async (req,res) => {
    const users = await User.find({});
    res.json(users)
}

exports.getUserProfile = async(req,res) => {
    const user = req.user;

    if(user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        })
    }
    else {
        res.status(400).json({message: "INVALID User data"})
    }
    
}

exports.createUser = async(req,res) => {
    console.log(req)
    const { firstName, lastName, email, role, password } = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json('user already exists')
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user.userId)
        })
    } else {
        res.status(400).json({message: "INVALID User data"})
    }
}

exports.deleteUser = async(req,res) => {
    const userId = req.params.userId;
    const user = await User.findOne({userId});
    if(user){
        await user.remove();
        res.json({message: 'User Removed'})
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
}

exports.updateUser = async(req,res) => {
    const userId = req.params.userId;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, {...updatedData});
    
    if(user){
        res.json({message: 'User Updated'})
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
}