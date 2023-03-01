import { Router, Request, Response } from 'express';
import MatchesControler from '../controlers/MatchesControler';

const matchesControler = new MatchesControler();

const routerMatches = Router();

routerMatches.get('/', (req: Request, res: Response) => matchesControler.getMatches(req, res));

export default routerMatches;
