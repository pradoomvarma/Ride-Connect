const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");


const registerHandler = async (req, res) => {
    try {
        const name = req.body.name;
        const userId = req.body.userId;
        const email = req.body.email;
        const password = req.body.password;

        const jwtToken = jwt.sign({ name: name, userId: userId, email: email, password: password },
            process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        sendMail({
            subject: 'Email Verification',
            to: req.body.email,
            text: `Hello,\n\nPlease verify your account by clicking the link: 
            localhost:4000/auth/verify/${userId}/${jwtToken}\n`
        });
        res.status(200).send({ message: "Verification email sent. Please check your inbox." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to send verification email. Please try again later." });
    }
}

const verifyHandler = async (req, res) => {
    try {
        const { userId, token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.userId !== userId) {
            return res.status(400).send({ message: "User verification failed. Token does not match." });
        }

        const newUser = new User({
            name: decoded.name,
            userId: decoded.userId,
            email: decoded.email,
            password: cryptoJS.AES.encrypt(decoded.password, process.env.SECRET_KEY).toString()
        });
        await newUser.save();
        res.status(201).send({ message: "User registration successful." });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error." });
        return;
    }
}

const loginHandler = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.userId });
        if (!user) {
            res.status(404).send({ message: "UserId passed is invalid." });
            return;
        } else if (cryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(cryptoJS.enc.Utf8) === req.body.password) {
            const jwtToken = jwt.sign({ "userId": user.userId, "name": user.name, id: user._id }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = user._doc;
            return res.cookie("token", jwtToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: '/',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }).send({ ...rest, jwtToken });
        } else {
            res.status(401).send({ message: "Invalid password." });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error." });
        return;
    }
}

module.exports = { registerHandler, verifyHandler, loginHandler };