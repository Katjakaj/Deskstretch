// User.model.js
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
    password: String
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
