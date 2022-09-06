const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body

    // 세가지 중 하나라도 값이 안들어오면 400 error
    if(!name || !email || !password){
        res.status(400)
        throw new Error("모두 입력해주세요")
    }
    
    // 이미 존재하는 이메일인지 확인. 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("이미 사용중인 이메일입니다.")
    }

    // 비밀번호 해쉬화
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    // 회원가입 유저 만들기
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("유효하지 않은 유저입니다.")
    }
})

const LoginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    // 가입이 되어있는 이메일인지 확안
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("이메일과 패스워드를 확인해주세요") 
    }
})

const GetLoginUser = asyncHandler(async (req,res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        email,
        name
    }) 
})

// 토큰 생성
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    LoginUser,
    GetLoginUser
}