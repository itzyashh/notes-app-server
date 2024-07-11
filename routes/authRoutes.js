import express from 'express';
import { login, signup } from '../controllers/authController.js';

const router = express.Router();

// @route  POST api/auth/signup
// @desc   Register a user
// @access Public
router.post('/signup', signup);

// @route  POST api/auth/login
// @desc   Login a user
// @access Public
router.post('/login', login);

export default router;