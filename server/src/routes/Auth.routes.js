import express from 'express';
import {signup} from '../controllers/Auth.controller.js';


const router = express.Router();

router.post('/signup', signup);

const auth = router;

export { auth };

