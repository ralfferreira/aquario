import { Router } from 'express';
import { CriarPublicacaoController } from '../controllers/CriarPublicacaoController';
import { ListarPublicacoesController } from '../controllers/ListarPublicacoesController';
import { BuscarPublicacaoPorIdController } from '../controllers/BuscarPublicacaoPorIdController';
import { EditarPublicacaoController } from '../controllers/EditarPublicacaoController';
import { DeletarPublicacaoController } from '../controllers/DeletarPublicacaoController';

const publicacoesRouter = Router();

const criarPublicacaoController = new CriarPublicacaoController();
const listarPublicacoesController = new ListarPublicacoesController();
const buscarPublicacaoPorIdController = new BuscarPublicacaoPorIdController();
const editarPublicacaoController = new EditarPublicacaoController();
const deletarPublicacaoController = new DeletarPublicacaoController();

publicacoesRouter.post('/', criarPublicacaoController.handle);
publicacoesRouter.get('/', listarPublicacoesController.handle);
publicacoesRouter.get('/:id', buscarPublicacaoPorIdController.handle);
publicacoesRouter.put('/:id', editarPublicacaoController.handle);
publicacoesRouter.delete('/:id', deletarPublicacaoController.handle);

export { publicacoesRouter };
