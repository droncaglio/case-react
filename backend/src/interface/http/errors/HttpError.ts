// src/interface/http/errors/HttpError.ts
export class HttpError extends Error {
    status: number;
    code?: string;
  
    constructor(message: string, status: number, code?: string) {
      super(message);
      this.status = status;
      this.code = code;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  