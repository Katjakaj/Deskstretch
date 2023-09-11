import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";


export const signup = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const newUser = new UserModel({
                email: req.body.email,
                password: hashedPassword,
            });

            const user = await UserModel.findOne({
                email: req.body.email,
              });

            if (user) {
                res.status(401).json('Email already in use');
                return;
            }

            await newUser.save();
            res.status(201).json("New User Created");
            console.log('USERSKAPAD BACKEND')
        } else {
            res.status(403).json("please provice a password");
        }
    } catch (error) {
        res.status(500).json(error);
    }        
};

export const login = async (req, res) => {
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // If both email and password are correct, you can consider it a successful login
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
