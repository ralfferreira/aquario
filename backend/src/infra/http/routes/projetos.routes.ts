import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CriarProjetoController } from '../controllers/CriarProjetoController';
import { ListarProjetosController } from '../controllers/ListarProjetosController';
import { EditarProjetoController } from '../controllers/EditarProjetoController';
import { DeletarProjetoController } from '../controllers/DeletarProjetoController';
import { BuscarProjetoPorIdController } from '../controllers/BuscarProjetoPorIdController';

const projetosRouter = Router();

const criarProjetoController = new CriarProjetoController();
const listarProjetosController = new ListarProjetosController();
const editarProjetoController = new EditarProjetoController();
const deletarProjetoController = new DeletarProjetoController();
const buscarProjetoPorIdController = new BuscarProjetoPorIdController();

projetosRouter.get('/', listarProjetosController.handle);
projetosRouter.get('/:id', buscarProjetoPorIdController.handle);
projetosRouter.post('/', ensureAuthenticated, criarProjetoController.handle);
projetosRouter.put('/:id', ensureAuthenticated, editarProjetoController.handle);
projetosRouter.delete('/:id', ensureAuthenticated, deletarProjetoController.handle);

export { projetosRouter };
