import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token || !token.startsWith('fake-token-for-')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const username = token.replace('fake-token-for-', '');
    req.user = username;
    next()
};
