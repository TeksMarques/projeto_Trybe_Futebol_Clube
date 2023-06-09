import { Router, Request, Response } from 'express';
import MatchesControler from '../controlers/MatchesControler';
import validationToken from '../middleware/validationToken';
import validationMatch from '../middleware/validationMatches';

const matchesControler = new MatchesControler();

const routerMatches = Router();

routerMatches.get('/', (req: Request, res: Response) => matchesControler.getMatches(req, res));
routerMatches.patch('/:id/finish', validationToken, (req: Request, res: Response) =>
  matchesControler.getMatchFinished(req, res));

routerMatches.patch('/:id', validationToken, (req: Request, res: Response) =>
  matchesControler.updateMatch(req, res));

routerMatches.post('/', validationToken, validationMatch, (req: Request, res: Response) =>
  matchesControler.newMatch(req, res));

export default routerMatches;
