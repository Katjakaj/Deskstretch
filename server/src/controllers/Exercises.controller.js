import ExercisesModel from "../models/Exercises.model.js";
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';



export const createExercise = async (req, res) => {
    try {
        const { title, desc } = req.body;

        if (!title || !desc) {
            res.status(400).send("Title and description are required");
            return;
        }

        // Check cookie for userId
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json("Invalid token/user");
        }

        try {
            var payload = jwt.verify(token, process.env.TOKEN_KEY);
        } catch (err) {
            return res.status(403).json("Invalid Token");
        }

        const user = await User.findOne({ _id: payload.id });

        if (!user) {
            res.status(400).send("Invalid user");
            return;
        }

        // Create a new exercise for the user
        const newExercise = await ExercisesModel.create({
            title,
            desc,
            user: user._id, // Assign the user ID to the 'user' field
        });

        // Update the user's exercises array if the user has the 'exercises' property
        if (user.exercises) {
            user.exercises.push(newExercise._id);
            await user.save();
        }

        res.status(201).json(newExercise);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error });
    }
};



  



export const getExercises = async (req, res) => {
    try {
        const exercises = await ExercisesModel.find();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteExercise = async (req, res) => {
    const { id } = req.params;
    try {
        await ExercisesModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateExercise = async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No exercise with id: ${id}`);

    const updatedExercise = { title, desc, _id: id };

    await ExercisesModel.findByIdAndUpdate(id, updatedExercise, { new: true });

    res.json(updatedExercise);
}