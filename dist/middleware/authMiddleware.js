"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !token.startsWith('fake-token-for-')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const username = token.replace('fake-token-for-', '');
    req.user = username;
    next();
};
exports.authMiddleware = authMiddleware;
