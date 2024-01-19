import mongoose from 'mongoose';

const exerciseSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
});

const DefaultExercisesModel = mongoose.model('DefaultExercises', exerciseSchema);

export default DefaultExercisesModel;
