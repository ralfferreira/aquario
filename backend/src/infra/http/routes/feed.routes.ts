import { Router } from 'express';
import { GerarFeedController } from '../controllers/GerarFeedController';

const feedRouter = Router();

const gerarFeedController = new GerarFeedController();

feedRouter.get('/', gerarFeedController.handle);

export { feedRouter };
