// src/interface/http/server.ts
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import classRouter from './routes/class.routes';
import studentRouter from './routes/student.routes';
import testRouter from './routes/test.routes';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos de uploads
app.use(
  '/uploads/students',
  express.static(path.join(__dirname, '../../../uploads/students'))
);

app.use('/auth', authRouter);
app.use('/classes', classRouter);
app.use('/students', studentRouter);
app.use('/test', testRouter);

// Middleware de tratamento de erros deve vir após as rotas
app.use(errorHandler);

export { app };
