import Queue, { Job } from 'bull';
import fs from 'fs';
import csvParser from 'csv-parser';
import { SequelizeStudentRepository } from '../db/repositories/SequelizeStudentRepository';
import { sendEmail } from '../services/EmailService';
import { StudentAttributes } from '../../database/models/Student';

// Define the structure of job data
interface ImportJobData {
  filePath: string;
  userEmail: string;
}

// Configure Redis connection
const redisConfig = {
  host: 'localhost', // Changed from 'redis' to 'localhost'
  port: 6379, // Redis default port
};

const queue = new Queue<ImportJobData>('student-import', {
  redis: redisConfig,
});

// Add event listeners for monitoring
queue.on('connected', () => {
  console.log('Queue connected to Redis');
});

queue.on('error', (error: Error) => {
  console.error('Queue connection error:', error);
});

queue.process('import-students', async (job: Job<ImportJobData>) => {
  console.log('Job received:', job.id);
  const { filePath, userEmail } = job.data;
  const studentRepository = new SequelizeStudentRepository();
  let importedCount = 0;

  // Change the type of studentsData to exclude 'id', 'createdAt', 'updatedAt', 'deletedAt'
  const studentsData: Omit<
    StudentAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >[] = [];

  console.log('Processing file:', filePath);

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: ['name', 'email', 'classId'], skipLines: 1 }))
      .on('data', (row) => {
        // Map CSV fields to plain student objects without 'id'
        studentsData.push({
          name: row.name,
          email: row.email,
          classId: parseInt(row.classId, 10),
        });
      })
      .on('end', async () => {
        try {
          await studentRepository.createMany(studentsData);
          importedCount = studentsData.length;

          console.log('Imported students:', importedCount);

          // Enviar email de notificação
          await sendEmail({
            to: userEmail,
            subject: 'Importação de Alunos Concluída',
            text: `Importação concluída. Número de alunos importados: ${importedCount}`,
          });

          console.log('Email sent to:', userEmail);

          // Remover o arquivo após o processamento
          fs.unlinkSync(filePath);
          resolve();
        } catch (err) {
          console.error('Error processing job:', err);
          reject(err);
        }
      })
      .on('error', (error: Error) => {
        console.error('Stream error:', error);
        reject(error);
      });
  });
});

// Add listeners for job completion and failure
queue.on('completed', (job: Job<ImportJobData>, result: void) => {
  console.log(`Job completed with result: ${result}`);
});

queue.on('failed', (job: Job<ImportJobData>, err: Error) => {
  console.error(`Job failed with error: ${err.message}`);
});

export { queue };
