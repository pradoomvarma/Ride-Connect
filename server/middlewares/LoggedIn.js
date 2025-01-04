const jwt = require("jsonwebtoken")

const LoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.token
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user_token = token
        req.user_name = user.name
        req.id = user.id
        next();
    }
    catch (err) {
        console.log(err)
        return res.send({
            success: false,
            message: "Not Logged In"
        })
    }
}

module.exports = LoggedIn