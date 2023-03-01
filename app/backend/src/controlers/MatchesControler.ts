import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response): Promise<Response | void> {
    const matches = await this.matchesService.getMatches();
    res.status(200).json(matches);
  }
}

export default MatchesController;
