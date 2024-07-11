import express from 'express';
import authRoutes from './authRoutes.js';
const rootRouter = express.Router();

rootRouter.use('/api/auth', authRoutes);

export default rootRouter;