import express, { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { users } from '../models/db';

const router: Router = express.Router();

router.get('/me', authMiddleware, (req: Request, res: Response): void => {
  const user = users.get(req.user!);
  res.json(user);
});

export default router;
