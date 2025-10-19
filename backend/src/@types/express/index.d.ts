declare namespace Express {
  export interface Request {
    usuario: {
      id: string;
      papelPlataforma: 'USER' | 'MASTER_ADMIN';
    };
  }
}
