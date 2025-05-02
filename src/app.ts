import express, { Express } from "express";
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

const app: Express = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

export default app;
