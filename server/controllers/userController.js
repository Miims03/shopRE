const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const checkEmailValidity = require("../modules/emailCheck");
const { Op } = require('sequelize');
const moment = require('moment-timezone');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password, dob, firstname, lastname } = req.body

        const isEmailValid = await checkEmailValidity(email);

        const user = await userModel.findOne({
            where: {
                username: username,
                email: email
            }
        })

        if (user) {
            if (user.username === username)
                return res.status(400).json('Username already registered.')
            if (user.email === email)
                return res.status(400).json('Email already registered.')
        }

        if (!username || !email || !password || !dob || !firstname || !lastname)
            return res.status(400).json('All fields required...')
        
        if (!isEmailValid)
            return res.status(400).json("Email does not exist...")

        if (!validator.isEmail(email))
            return res.status(400).json("Email is not valid...")

        if (!validator.isStrongPassword(password))
            return res.status(400).json("Password most be strong...")

        const hashedPassword = await bcrypt.hash(password, 10);

        // const now = moment().tz('Europe/Paris')

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,
            dob: dob,
            firstname: firstname,
            lastname: lastname,
        });
        

        const token = createToken(newUser._id)

        res.status(200).json({ _id: newUser, token })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const loginUser = async (req, res) => {

    const { username, email, password } = req.body

    if ((!username && !email) || !password) {
        return res.status(400).json('Username/email and password are required' );
    }

    try {

        const user = await userModel.findOne({
            where: {
                [Op.or]: [
                    { email: email || null },
                    { username: username || null }
                ]
            }
        })

        if (!user)
            return res.status(400).json('Invalid username / email or password')

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid)
            return res.status(400).json('Invalid username / email or password')

        const token = createToken(user._id)

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const findUser = async (req, res) => {

    const userId = req.params.id

    try {
        const user = await userModel.findByPk(userId)
        res.status(200).json(user)
            .username, user.email

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}

const getUser = async (req, res) => {
    try {
        const user = await userModel.findAll()
        res.status(200).json(user)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}

module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUser
}