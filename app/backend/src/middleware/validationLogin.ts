import { Request, Response, NextFunction } from 'express';

function validationLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  next();
}

export default validationLogin;
