import express from 'express';
import {signup, login, logout, validate} from '../controllers/Auth.controller.js';


const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.get('/validate', validate);


const auth = router;

export { auth };

