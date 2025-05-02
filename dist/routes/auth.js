"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("../models/db");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6)
});
router.post('/register', (0, validate_1.validate)(registerSchema), (req, res) => {
    const { username, password } = req.body;
    if (db_1.users.has(username)) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    db_1.users.set(username, { username, password });
    res.status(201).json({ message: 'User registered successfully' });
});
router.post('/login', (0, validate_1.validate)(registerSchema), (req, res) => {
    const { username, password } = req.body;
    const user = db_1.users.get(username);
    if (!user || user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    res.status(200).json({ token: `fake-token-for-${username}` });
});
exports.default = router;
