import 'dotenv/config';
import { app } from './interface/http/server';
import { sequelize } from './database/models'; // Importa os modelos e inicializa
import { ImageService } from './infra/services/ImageService';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Inicializar o serviço de imagens
    ImageService.initialize();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start();
