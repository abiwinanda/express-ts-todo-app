import { Router, Request, Response } from "express";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware } from "../middleware/authMiddleware";
import { todos } from "../models/db";
import { validate } from "../middleware/validate";

const router = Router()

const todoSchema = z.object({
    title: z.string().min(1)
});

const todoIdSchema = z.object({
    id: z.string()
});

router.use(authMiddleware);

router.get('/', (req: Request, res: Response): void => {
    const userTodos = todos.get(req.user!) || [];
    res.status(200).json(userTodos);
});

router.post('/', validate(todoSchema), (req: Request, res: Response): void => {
    const { title } = req.body;
    const newTodo = { id: uuidv4(), title, done: false};

    const userTodos = todos.get(req.user!) || [];
    userTodos.push(newTodo);
    todos.set(req.user!, userTodos);

    res.status(201).json(newTodo);
});

router.post('/complete', validate(todoIdSchema), (req: Request, res: Response): void => {
    const { id } = req.body;

    const userTodos = todos.get(req.user!) || [];

    const userUpdatedTodos = userTodos.map(todo =>
        todo.id === id ? { ...todo, done: true } : todo
      );

    const completedTodo = userUpdatedTodos.find(todo => todo.id === id);

    todos.set(req.user!, userUpdatedTodos);
    res.status(201).json(completedTodo);
});

export default router;
