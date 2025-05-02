"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const db_1 = require("../models/db");
const router = express_1.default.Router();
router.get('/me', authMiddleware_1.authMiddleware, (req, res) => {
    const user = db_1.users.get(req.user);
    res.json(user);
});
exports.default = router;
