import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor(service: UserService) {
    this.userService = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.login({ email, password });

    if (!token) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json(token);
  }

  async role(_req: Request, res: Response) {
    const { email } = res.locals.token;
    const result = await this.userService.role(email);

    if (!result) res.status(401).json({ message: 'Invalid email or password' });
    res.status(200).json({ role: result });
  }
}

export default UserController;
