const express = require("express");

const verifyRegister = require("../middlewares/auth-middleware.js");
const { registerHandler, verifyHandler, loginHandler } = require("../Controller/auth");

const authRouter = express.Router();

authRouter.route("/register")
    .post([verifyRegister], registerHandler);

authRouter.route("/verify/:userId/:token")
    .get(verifyHandler);

authRouter.route("/login")
    .post(loginHandler);

module.exports = authRouter;