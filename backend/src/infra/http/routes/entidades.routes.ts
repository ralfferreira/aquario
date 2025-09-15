import { Router } from 'express';
import { ListarEntidadesController } from '../controllers/ListarEntidadesController';
import { BuscarEntidadePorIdController } from '../controllers/BuscarEntidadePorIdController';

const entidadesRouter = Router();

const listarEntidadesController = new ListarEntidadesController();
const buscarEntidadePorIdController = new BuscarEntidadePorIdController();

entidadesRouter.get('/', listarEntidadesController.handle);
entidadesRouter.get('/:id', buscarEntidadePorIdController.handle);

export { entidadesRouter };
