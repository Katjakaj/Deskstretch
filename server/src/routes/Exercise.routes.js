// Exercise.routes.js
import express from 'express';
import { checkAuth } from '../middlewares/CheckAuth.middlewares.js';

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  res.send('This is the /exercise route.');
});

export default router;
