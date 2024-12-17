import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secr3t'; // defina em .env
const JWT_EXPIRES_IN = '1d'; // 1 dia

export class AuthService {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): string | object | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch {
      return null;
    }
  }
}
