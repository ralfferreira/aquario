import express, { Express, Request, Response } from 'express';
import { publicacoesRouter } from './routes/publicacoes.routes';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/publicacoes', publicacoesRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend do Aquário está no ar!');
});

app.listen(port, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${port}`);
});
