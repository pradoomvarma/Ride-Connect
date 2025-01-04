const User = require("../models/user");


const verifyRegister = async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(400).send({ message: "Please provide Name." });
            return;
        }
        if (!req.body.userId) {
            res.status(400).send({ message: "Please provide User ID." });
            return;
        }
        if (!req.body.email) {
            res.status(400).send({ message: "Please provide Email." });
            return;
        }
        if (!req.body.password) {
            res.status(400).send({ message: "Please provide password." });
            return;
        }
        const userById = await User.findOne({ userId: req.body.userId });
        if (userById) {
            res.status(400).send({ message: "User ID already exists." });
            return;
        }

        const userByEmail = await User.findOne({ email: req.body.email });
        if (userByEmail) {
            res.status(400).send({ message: "Email ID already exists." });
            return;
        }

        // const email = /^[a-zA-Z0-9]+@smail.iitm.ac.in$/;
        // if (!email.test(req.body.email)) {
        //     return res.status(400).send({ message: "Please provide institute Email ID." });
        // }

        const password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (!(req.body.password.match(password))) {
            res.status(400).send({ message: "Password must meet the following criteria: - Contain at least one digit (0-9) - Contain at least one special character (!@#$%^&*) - Be 8 to 16 characters long" });
            return;
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error." });
        return;
    }
}

module.exports = verifyRegister;