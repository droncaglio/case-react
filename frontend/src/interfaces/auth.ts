// src/interfaces/auth.ts

export interface LoginResponseData {
  data: {
    token: string;
  };
  message?: string;
}