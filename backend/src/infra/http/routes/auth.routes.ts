import { Router } from 'express';
import { AuthenticateController } from '../controllers/AuthenticateController';
import { RegisterController } from '../controllers/RegisterController';
import { MeuPerfilController } from '../controllers/MeuPerfilController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const authRouter = Router();

const loginController = new AuthenticateController();
const registerController = new RegisterController();
const meuPerfilController = new MeuPerfilController();

authRouter.post('/login', loginController.handle);
authRouter.post('/register', registerController.handle);
authRouter.get('/me', ensureAuthenticated, meuPerfilController.handle);

export { authRouter };
