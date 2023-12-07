// Exercises.model.js
import mongoose from 'mongoose';

const exerciseSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

const ExercisesModel = mongoose.model('ExercisesModel', exerciseSchema);

export default ExercisesModel;
