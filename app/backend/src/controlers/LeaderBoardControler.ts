import { Request, Response } from 'express';
import LeaderBoardservice from '../services/LeaderBoardService';

class LeaderBoardControler {
  static async getLeaderBoard(req: Request, res: Response) {
    const result = await LeaderBoardservice.getLeaderBoard();
    res.status(200).json(result);
  }

  static async getLeaderBoaderAway(req: Request, res: Response) {
    const HomeStats = await LeaderBoardservice.getLeaderBoaderAway();
    return res.status(200).json(HomeStats);
  }
}

export default LeaderBoardControler;
