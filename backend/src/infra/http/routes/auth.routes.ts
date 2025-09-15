import { Router } from 'express';
import { RegisterController } from '../controllers/RegisterController';
import { AuthenticateController } from '../controllers/AuthenticateController';

const authRouter = Router();

const registerController = new RegisterController();
const authenticateController = new AuthenticateController();

authRouter.post('/register', registerController.handle);
authRouter.post('/login', authenticateController.handle);

export { authRouter };
