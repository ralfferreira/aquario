import { Router } from 'express';
import { ListarCentrosController } from '../controllers/ListarCentrosController';
import { ListarCursosPorCentroController } from '../controllers/ListarCursosPorCentroController';

const centrosRouter = Router();

const listarCentrosController = new ListarCentrosController();
const listarCursosPorCentroController = new ListarCursosPorCentroController();

centrosRouter.get('/', listarCentrosController.handle);
centrosRouter.get('/:id/cursos', listarCursosPorCentroController.handle);

export { centrosRouter };
