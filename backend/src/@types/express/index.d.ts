// Adiciona a propriedade 'usuario' ao tipo Request do Express
declare namespace Express {
  export interface Request {
    usuario: {
      id: string;
    };
  }
}
