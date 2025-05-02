import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { users } from '../models/db';
import { validate } from '../middleware/validate';
import { JWT_SECRET } from '../config';

const router: Router = express.Router();

const registerSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
})

router.post('/register', validate(registerSchema), (req: Request, res: Response): void => {
    const { username, password } = req.body;

    if (users.has(username)) {
        res.status(400).json({message: 'User already exists'});
        return;
    }

    users.set(username, { username, password });
    res.status(201).json({ message: 'User registered successfully'});
});

router.post('/login', validate(registerSchema), (req: Request, res: Response): void => {
    const { username, password } = req.body;
    const user = users.get(username);

    if (!user || user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token: token });
});

export default router;
