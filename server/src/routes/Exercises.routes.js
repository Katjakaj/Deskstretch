import express from 'express';
import { createExercise, getUserExercises, getAllExercises, deleteExercise, updateExercise, getDefaultExercises} from '../controllers/Exercises.controller.js';

const router = express.Router();

router.post('/create', createExercise);

router.get('/user', getUserExercises);

router.get('/all', getAllExercises);

router.get('/default' , getDefaultExercises);

router.delete('/:id', deleteExercise);

router.patch('/:id', updateExercise);

const exercises = router;

export { exercises };