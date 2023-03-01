import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getMatches(inProgress);
    res.status(200).json(matches);
  }

  public async getMatchFinished(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    await this.matchesService.getMatchFinished(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Placar atualizado' });
  }
}

export default MatchesController;
