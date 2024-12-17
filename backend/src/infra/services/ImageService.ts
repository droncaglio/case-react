// src/infra/services/ImageService.ts
import fs from 'fs';
import path from 'path';

export class ImageService {
  private static uploadPath = path.join(__dirname, '../../../uploads/students');

  static initialize() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  static getImagePath(filename: string): string {
    return path.join(this.uploadPath, filename);
  }

  static deleteImage(filename: string): void {
    const filePath = this.getImagePath(filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static getImageUrl(filename: string): string {
    // Defina a lógica para gerar a URL da imagem, se for servida via Express
    // Por exemplo: `http://localhost:3000/uploads/students/${filename}`
    return `/uploads/students/${filename}`;
  }
}
