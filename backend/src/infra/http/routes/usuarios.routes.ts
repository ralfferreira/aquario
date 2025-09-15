import { Router } from 'express';
import { ListarUsuariosController } from '../controllers/ListarUsuariosController';
import { BuscarUsuarioPorIdController } from '../controllers/BuscarUsuarioPorIdController';

const usuariosRouter = Router();

const listarUsuariosController = new ListarUsuariosController();
const buscarUsuarioPorIdController = new BuscarUsuarioPorIdController();

usuariosRouter.get('/', listarUsuariosController.handle);
usuariosRouter.get('/:id', buscarUsuarioPorIdController.handle);

export { usuariosRouter };
