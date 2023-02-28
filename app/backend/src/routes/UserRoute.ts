import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';
import UserController from '../controlers/UserControler';
import validationLogin from '../middleware/validationLogin';

const routerUser = Router();

const userService = new UserService();
const userController = new UserController(userService);

routerUser.post(
  '/',
  validationLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default routerUser;
