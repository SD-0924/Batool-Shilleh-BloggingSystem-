import express from 'express';
import sequelize from './config/db';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import categoriesRouter from './routes/categoryRouter';
import commentsRouter from './routes/commentRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import dotenv from 'dotenv';

// Import associations after models are loaded
import './models/associations';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoriesRouter);
app.use('/api/comments', commentsRouter);
app.use(errorMiddleware);

const server = app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

sequelize.sync().then(() => {
  // console.log('Database synchronized')
});

export { app, server };
