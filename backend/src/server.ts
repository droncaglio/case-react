import express from 'express';
import { json } from 'body-parser';
import { queue } from './infra/queues/studentImportQueue';
import './infra/queues/studentImportQueue';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

const startServer = async () => {
  try {
    // Ensure queue is ready
    await queue.isReady();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
