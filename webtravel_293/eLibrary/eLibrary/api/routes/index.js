import express from 'express';
import commentsRouter from './comments.js';
import tripsRouter from './trips.js';
import usersRouter from './users.js';
import authRouter from './auth.js';

const router = express.Router();

router.use('/comments', commentsRouter);
router.use('/trips', tripsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
