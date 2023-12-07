import mongoose from "mongoose";
import ExercisesModel from './Exercises.model.js'; // Adjust the path based on your project structure


const UserSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
    password: String
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
