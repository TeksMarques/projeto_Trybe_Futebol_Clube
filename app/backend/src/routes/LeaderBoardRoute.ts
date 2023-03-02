import { Router, Request, Response } from 'express';
import LeaderBoardControler from '../controlers/LeaderBoardControler';

const routeLeaderBoard = Router();

routeLeaderBoard.get('/home', (req: Request, res: Response) =>
  LeaderBoardControler.getLeaderBoard(req, res));

export default routeLeaderBoard;
