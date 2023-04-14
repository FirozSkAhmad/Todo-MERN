// const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//=========================================================REGISTER==================================================
async function regiserUser(req, res) {
    try {
        const { name, email, password } = req.body;

        let data = { email, password, name };

        let isUser = await userModel.findOne({ email: email });

        if (isUser) {
            return res
                .status(400)
                .send({ status: false, message: "Email already exist" });
        }

        const hash = bcrypt.hashSync(password, 10);
        data["password"] = hash;

        let user = await userModel.create(data);

        return res
            .status(200)
            .send({ status: true, message: "Registered Successfully", user });
    }
    catch (err) {
        return res
            .status(500)
            .send({ message: err.message });
    }
}

//================================================LOGIN========================================
async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
    });

    if (!user) {
        return res.status(401).send({ status: false, message: "No user exists with the given EmailId" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            { user_id: user._id, name: user.name, email: user.email },
            "secret123"
        );

        return res.status(200).send({ token });
    } else {
        return res.status(401).send({ status: false, message: "Invalid password" });
    }
}
//================================================GET USER=====================================
async function getUser(req, res) {
    try {
        let decoded = req.headers.decodedToken;
        console.log(decoded);

        const email = decoded.email;
        const user = await userModel.findOne({ email: email });

        return res.status(200).send({ status: true, data: user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { regiserUser, login, getUser };