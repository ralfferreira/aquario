import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdminOrDocente } from '../middlewares/ensureAdminOrDocente';
import { CriarVagaController } from '../controllers/CriarVagaController';
import { ListarVagasController } from '../controllers/ListarVagasController';
import { EditarVagaController } from '../controllers/EditarVagaController';
import { DeletarVagaController } from '../controllers/DeletarVagaController';

const vagasRouter = Router();

const criarVagaController = new CriarVagaController();
const listarVagasController = new ListarVagasController();
const editarVagaController = new EditarVagaController();
const deletarVagaController = new DeletarVagaController();

vagasRouter.get('/', listarVagasController.handle);
vagasRouter.post('/', ensureAuthenticated, ensureAdminOrDocente, criarVagaController.handle);
vagasRouter.put('/:id', ensureAuthenticated, editarVagaController.handle);
vagasRouter.delete('/:id', ensureAuthenticated, deletarVagaController.handle);

export { vagasRouter };
