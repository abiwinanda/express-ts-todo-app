"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const authMiddleware_1 = require("../middleware/authMiddleware");
const db_1 = require("../models/db");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
const todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1)
});
const todoIdSchema = zod_1.z.object({
    id: zod_1.z.string()
});
router.use(authMiddleware_1.authMiddleware);
router.get('/', (req, res) => {
    const userTodos = db_1.todos.get(req.user) || [];
    res.status(200).json(userTodos);
});
router.post('/', (0, validate_1.validate)(todoSchema), (req, res) => {
    const { title } = req.body;
    const newTodo = { id: (0, uuid_1.v4)(), title, done: false };
    const userTodos = db_1.todos.get(req.user) || [];
    userTodos.push(newTodo);
    db_1.todos.set(req.user, userTodos);
    res.status(201).json(newTodo);
});
router.post('/complete', (0, validate_1.validate)(todoIdSchema), (req, res) => {
    const { id } = req.body;
    const userTodos = db_1.todos.get(req.user) || [];
    const userUpdatedTodos = userTodos.map(todo => todo.id === id ? { ...todo, done: true } : todo);
    const completedTodo = userUpdatedTodos.find(todo => todo.id === id);
    db_1.todos.set(req.user, userUpdatedTodos);
    res.status(201).json(completedTodo);
});
exports.default = router;
