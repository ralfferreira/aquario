import express, { Express, Request, Response } from 'express';
import { publicacoesRouter } from './routes/publicacoes.routes';
import { achadosEPerdidosRouter } from './routes/achados-e-perdidos.routes';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/publicacoes', publicacoesRouter);
app.use('/achados-e-perdidos', achadosEPerdidosRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend do Aquário está no ar!');
});

app.listen(port, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${port}`);
});
