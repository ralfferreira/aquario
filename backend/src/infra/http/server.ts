import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { env } from '@/config/env';
import { logger } from '@/infra/logger';
import { publicacoesRouter } from './routes/publicacoes.routes';
import { achadosEPerdidosRouter } from './routes/achados-e-perdidos.routes';
import { authRouter } from './routes/auth.routes';
import { vagasRouter } from './routes/vagas.routes';
import { projetosRouter } from './routes/projetos.routes';
import { centrosRouter } from './routes/centros.routes';
import { usuariosRouter } from './routes/usuarios.routes';
import { entidadesRouter } from './routes/entidades.routes';
import { feedRouter } from './routes/feed.routes';
import { searchRoutes } from './routes/search.routes';
import { guiasRouter } from './routes/guias.routes';
import { requestLogger } from './middlewares/requestLogger';

const app: Express = express();
const port = env.PORT;
const serverLogger = logger.child('http:server');

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/publicacoes', publicacoesRouter);
app.use('/achados-e-perdidos', achadosEPerdidosRouter);
app.use('/vagas', vagasRouter);
app.use('/projetos', projetosRouter);
app.use('/centros', centrosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/entidades', entidadesRouter);
app.use('/feed', feedRouter);
app.use('/search', searchRoutes);
app.use('/guias', guiasRouter);
app.use(authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend do Aquário está no ar!');
});

app.listen(port, () => {
  serverLogger.info('Servidor iniciado', { port });
});

process.on('unhandledRejection', reason => {
  serverLogger.error('Unhandled rejection detected', reason);
});

process.on('uncaughtException', error => {
  serverLogger.error('Uncaught exception detected', error);
});
