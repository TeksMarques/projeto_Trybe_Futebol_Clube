import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getMatches(inProgress);
    res.status(200).json(matches);
  }
}

export default MatchesController;
