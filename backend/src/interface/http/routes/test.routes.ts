// src/interface/http/routes/test.routes.ts
import { Router } from 'express';

const testRouter = Router();

testRouter.get('/test-error', () => {
  throw new Error('Erro de teste');
});

export default testRouter;
