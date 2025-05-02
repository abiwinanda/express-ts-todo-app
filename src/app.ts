import express, { Express } from "express";
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import todoRoutes from './routes/todos';

const app: Express = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

export default app;
