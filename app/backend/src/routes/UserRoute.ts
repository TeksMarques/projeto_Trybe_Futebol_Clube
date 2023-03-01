import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controlers/UserControler';
import validationLogin from '../middleware/validationLogin';
import validationToken from '../middleware/validationToken';

const routerUser = Router();

const userService = new UserService();
const userController = new UserController(userService);

routerUser.post(
  '/',
  validationLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

routerUser.get('/role', validationToken, (req: Request, res: Response) =>
  userController.role(req, res));

export default routerUser;
