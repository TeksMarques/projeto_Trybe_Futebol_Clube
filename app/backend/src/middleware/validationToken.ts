import { Request, Response, NextFunction } from 'express';
import Token from '../utils/token';

function validationToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const verify = Token.verifica(authorization);
    res.locals.token = verify;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default validationToken;
