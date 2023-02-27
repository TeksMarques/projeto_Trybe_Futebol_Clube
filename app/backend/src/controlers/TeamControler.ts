import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamControler {
  private teamService: TeamService = new TeamService();

  public async getTeams(req: Request, res: Response): Promise<Response> {
    const result = await this.teamService.getTeams();
    return res.status(200).json(result);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await this.teamService.getTeamById(Number(id));
    return res.status(200).json(result);
  }
}

export default TeamControler;
