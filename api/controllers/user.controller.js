import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (
        !username ||
        !email ||
        !password ||
        password.length < 6 ||
        username.length === "" ||
        email.length === ""
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json({
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    const { username, password } = req.body;
    if (
        !username ||
        !password ||
        username.length === "" ||
        password.length === ""
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const validUser = await User.findOne({
            username,
        });
        if (!validUser) {
            return res.status(400).json({ message: "Invalid username" });
        }
        const validPassword = await bcryptjs.compare(
            password,
            validUser.password
        );
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signout = (req, res) => {
    try {
        res.clearCookie("access_token").status(200).json("Logged out successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};