// src/interface/http/routes/student.routes.ts
import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import path from 'path';
import { ImageService } from '../../../infra/services/ImageService';

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ImageService.getImagePath('')); // Diretório de upload já inicializado
  },
  filename: (req, file, cb) => {
    console.log('saving file ' + file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Aceita apenas imagens
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

const studentRouter = Router();

// Rota para listar alunos
studentRouter.get('/', ensureAuthenticated, asyncHandler(StudentController.list));

// Rota para criar aluno (com upload de imagem)
studentRouter.post('/', ensureAuthenticated, upload.single('image'), asyncHandler(StudentController.create));

// Rota para editar aluno (com upload de imagem opcional)
studentRouter.put('/:id', ensureAuthenticated, upload.single('image'), asyncHandler(StudentController.edit));

// Rota para visualizar aluno
studentRouter.get('/:id', ensureAuthenticated, asyncHandler(StudentController.view));

// Rota para deletar aluno
studentRouter.delete('/:id', ensureAuthenticated, asyncHandler(StudentController.delete));

export default studentRouter;
