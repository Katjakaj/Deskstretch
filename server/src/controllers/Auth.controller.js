import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";


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

        // Create a token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
        );

        console.log(token);

        res.cookie("access_token", token, {
          httpOnly: true,
        });
        
        
        // If both email and password are correct, you can consider it a successful login
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

  
export const validate = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
      if (err) {
          console.error("Token verification failed:", err);
          return res.status(403).json({ message: "Forbidden" });
      }

      // If the token is valid, generate a new access token
      const newToken = jwt.sign(
          { id: payload.id },
          process.env.TOKEN_KEY,
          { expiresIn: "1h" }
      );

      // Set the new token in a cookie
      res.cookie("access_token", newToken, {
          httpOnly: true,
      });

      // Respond with the new token
      res.status(200).json({ access_token: newToken });
  });
};
