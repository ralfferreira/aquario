import { Router } from 'express';
import { CriarPublicacaoController } from '../controllers/CriarPublicacaoController';
import { ListarPublicacoesController } from '../controllers/ListarPublicacoesController';
import { BuscarPublicacaoPorIdController } from '../controllers/BuscarPublicacaoPorIdController';
import { EditarPublicacaoController } from '../controllers/EditarPublicacaoController';
import { DeletarPublicacaoController } from '../controllers/DeletarPublicacaoController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const publicacoesRouter = Router();

const criarPublicacaoController = new CriarPublicacaoController();
const listarPublicacoesController = new ListarPublicacoesController();
const buscarPublicacaoPorIdController = new BuscarPublicacaoPorIdController();
const editarPublicacaoController = new EditarPublicacaoController();
const deletarPublicacaoController = new DeletarPublicacaoController();

// Rotas Públicas
publicacoesRouter.get('/', listarPublicacoesController.handle);
publicacoesRouter.get('/:id', buscarPublicacaoPorIdController.handle);

// Rotas Protegidas
publicacoesRouter.post('/', ensureAuthenticated, criarPublicacaoController.handle);
publicacoesRouter.put('/:id', ensureAuthenticated, editarPublicacaoController.handle);
publicacoesRouter.delete('/:id', ensureAuthenticated, deletarPublicacaoController.handle);

export { publicacoesRouter };
